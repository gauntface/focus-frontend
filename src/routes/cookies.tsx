import { createFileRoute } from "@tanstack/react-router";
import { Cookies } from "@/pages/Cookies/Cookies";

export const Route = createFileRoute("/cookies")({
	component: Cookies,
	head: () => {
		return { meta: [{ title: "Cookies" }] };
	},
});
