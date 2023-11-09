import "@radix-ui/themes/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./global.css";

import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { ErrorBoundary as ErrorBoundaryComponent } from "./components/error-boundary";
import { AuthProvider } from "./components/provider/auth";
import { RootProviders } from "./components/provider/root";
import { authorizationMiddleware } from "./middleware/authorization.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [{ title: "CMail" }];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { email } = await authorizationMiddleware(request, context.env);

  return { email };
}

export default function App() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProviders>
          <AuthProvider email={email}>
            <Outlet />
          </AuthProvider>
        </RootProviders>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProviders>
          <ErrorBoundaryComponent />
        </RootProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
