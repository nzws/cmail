import { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { authorizationMiddleware } from "@/app/middleware/authorization.server";
import { r2MailAttachmentKey } from "@/lib/r2/keys";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  await authorizationMiddleware(request, context.env);

  const { searchParams } = new URL(request.url);
  const id = params.id;
  const filename = searchParams.get("filename");
  if (!id || !filename) {
    throw new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
  const object = await context.env.BUCKET.get(
    r2MailAttachmentKey(id, filename),
  );
  if (object === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
}
