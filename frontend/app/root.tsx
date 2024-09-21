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
import toastifyStyles from "react-toastify/dist/ReactToastify.css?url";
import type { LinksFunction } from "@remix-run/node";
import { ToastContainer } from "react-toastify";
import { FocusAuthProvider } from "./contexts/Auth";

export const links: LinksFunction = () => [
  // Toastify styles *before* our vars to ensure we override them
  { rel: "stylesheet", href: toastifyStyles },

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
        <FocusAuthProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            newestOnTop={true}
          />
        </FocusAuthProvider>
        <ScrollRestoration />
        <Scripts />
        <script async defer src="https://beampipe.io/js/tracker.js" data-beampipe-domain={import.meta.env.VITE_PUBLIC_BEAMPIPE_ANALYTICS}></script>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
