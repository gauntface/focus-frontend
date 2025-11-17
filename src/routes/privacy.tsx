import { createFileRoute } from "@tanstack/react-router";
import { Privacy } from "@/pages/Privacy/Privacy";

export const Route = createFileRoute("/privacy")({
	component: Privacy,
	head: () => {
		return { meta: [{ title: "Privacy Policy" }] };
	},
});
