import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import colorStyles from  '~/styles/variables/_colors.css?url';
import fontStyles from  '~/styles/variables/_fonts.css?url';
import dimenStyles from '~/styles/variables/_dimens.css?url';
import globalStyles from  '~/styles/globals.css?url';
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: colorStyles },
  { rel: "stylesheet", href: fontStyles },
  { rel: "stylesheet", href: dimenStyles },
  { rel: "stylesheet", href: globalStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
