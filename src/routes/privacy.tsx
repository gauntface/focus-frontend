import { Privacy } from "@/pages/Privacy/Privacy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
	component: Privacy,
	head: () => {
		return { meta: [{ title: "Privacy Policy" }] };
	},
});
