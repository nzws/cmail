import { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { authorizationMiddleware } from "@/app/middleware/authorization.server";
import { getDB, getMail } from "@/lib/db";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  await authorizationMiddleware(request, context.env);

  const { searchParams } = new URL(request.url);
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const db = getDB(context.env);
  const mail = await getMail(db, id);
  if (!mail?.isHtml) {
    throw new Response("Not found", { status: 404 });
  }

  const allowExternalImages = searchParams.get("allow_external_images");

  return new Response(
    `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        html, body {
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
            overflow-y: hidden;
        }
    </style>
  </head>
  <body>
  <!--email_off-->
  ${mail.content}
  <!--/email_off-->
  </body>
  </html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": getContentSecurityPolicy(
          !!allowExternalImages,
        ),
        "X-Frame-Options": "SAMEORIGIN",
      },
    },
  );
}

const getContentSecurityPolicy = (allowExternalImages = false) => {
  const csp: Record<string, string[]> = {
    "default-src": ["'self'"],
    "img-src": ["'self'", "data:", "blob:"],
    "style-src": ["'self'", "'unsafe-inline'"],
  };

  if (allowExternalImages) {
    csp["img-src"].push("*");
  }

  return Object.keys(csp)
    .map((key) => `${key} ${csp[key].join(" ")}`)
    .join("; ");
};
