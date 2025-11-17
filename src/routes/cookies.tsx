import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage/LegalPage";

export const Route = createFileRoute("/cookies")({
	component: Cookies,
	head: () => {
		return { meta: [{ title: "Cookies" }] };
	},
});

function Cookies() {
	return (
		<LegalPage>
			<h1>Cookies</h1>
			<p>Last updated: Mar 12, 2023</p>

			<h2>Required Cookies</h2>

			<p>
				We strive to only store cookies that are necessary to make This tool
				function correctly.
			</p>

			<p>
				At the time of writing the only cookies we use are the cookies created
				by <a href="https://firebase.google.com">Firebase/Google</a>, which are
				used for authentication.
			</p>

			<h2>Analytics and Tracking</h2>

			<p>
				Beampipe is used to get analytics on Focuses usage. We have selected
				Beampipe due to it&apos;s privacy focus.
			</p>

			<p>
				You can view the data we track{" "}
				<a
					href="https://app.beampipe.io/domain/focus.gaunt.dev"
					target="_blank"
				>
					here
				</a>
				.
			</p>
		</LegalPage>
	);
}
