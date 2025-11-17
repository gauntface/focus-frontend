import { createFileRoute } from "@tanstack/react-router";
import { Day } from "./day/$date";

export const Route = createFileRoute("/home")({ component: Day });
