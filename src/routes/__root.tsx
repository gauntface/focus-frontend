import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ToastContainer } from "react-toastify";
import { FocusAuthProvider } from "@/contexts/Auth";
import { MarketingNav } from "@/components/MarketingNav/MarketingNav";
import { Footer } from "@/components/Footer/Footer";
import { registerInstallPrompt } from "@/controllers/app-banner";
import { registerSW } from "@/controllers/service-worker";

registerInstallPrompt();
registerSW();

export const Route = createRootRoute({
	component: () => (
		<>
			<FocusAuthProvider>
				<Outlet />
			</FocusAuthProvider>
			<ToastContainer position="bottom-right" newestOnTop={true} />
			<TanStackDevtools
				config={{ position: "bottom-right" }}
				plugins={[
					{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
				]}
			/>
		</>
	),
	notFoundComponent: () => (
		<>
			<MarketingNav />

			<main>
				<h1>Oops</h1>
				<p>Looks like you're trying to find a page that doesn't exist.</p>

				<p>¯\_(ツ)_/¯</p>
			</main>

			<Footer />
		</>
	),
});
