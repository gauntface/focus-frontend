import { beforeEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { TaskHeader } from "./TaskHeader";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
	routeTree,
});

describe("TaskHeader", () => {
	beforeEach(() => {
		cleanup();
	});

	const renderWithRouter = (component: React.ReactElement) => {
		return render(component, {
			wrapper: (props) => (
				<RouterContextProvider router={router}>
					{props.children}
				</RouterContextProvider>
			),
		});
	};

	test("renders header with intro and date", () => {
		renderWithRouter(
			<TaskHeader
				date={new Date(2006, 0, 2)}
				user={{ displayName: "Firstname Lastname" }}
				selectedView="day"
			/>,
		);

		const title = screen.getByText("Firstname", { exact: false });
		expect(title).toBeTruthy();

		const date = screen.getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	test("renders header with date only when no display name", () => {
		renderWithRouter(
			<TaskHeader
				date={new Date(2006, 0, 2)}
				user={{ displayName: null }}
				selectedView="day"
			/>,
		);

		expect(() => screen.getByText("Hey, ")).toThrow();

		const date = screen.getByText("Monday, January 2nd 2006");
		expect(date).toBeTruthy();
	});

	test("renders header with date for week view", () => {
		const { getByTestId } = renderWithRouter(
			<TaskHeader
				date={new Date(2006, 0, 2)}
				user={{ displayName: "Firstname Lastname" }}
				selectedView="week"
			/>,
		);

		const title = screen.getByText("Firstname", { exact: false });
		expect(title).toBeTruthy();

		const date = screen.getByText("January 2nd 2006 - January 6th 2006");
		expect(date).toBeTruthy();

		const viewBtn = getByTestId(
			"task-header__task--selected",
		) as HTMLAnchorElement;
		expect(viewBtn).toBeTruthy();
		expect(viewBtn.getAttribute("href")).toBe("/week/2006/1");
	});
});
