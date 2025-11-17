import { beforeEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RouterContextProvider, createRouter } from "@tanstack/react-router";
import { WeekSelector } from "./WeekSelector";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
	routeTree,
});

describe("WeekSelector", () => {
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

	test.only("renders week selector", () => {
		renderWithRouter(<WeekSelector date={new Date(2006, 0, 2)} />);

		// Check previous week button
		const prevWeekBtn = screen.getByLabelText("Previous week");
		expect(prevWeekBtn).toBeTruthy();
		expect(prevWeekBtn.getAttribute("href")).toBe("/week/2005/53");

		const nextWeekBtn = screen.getByLabelText("Next week");
		expect(nextWeekBtn).toBeTruthy();
		expect(nextWeekBtn.getAttribute("href")).toBe("/week/2006/2");

		const textEle = screen.getByText("January 2006 - Week 1");
		expect(textEle).toBeTruthy();
	});

	test("renders week selector correctly between years", () => {
		renderWithRouter(<WeekSelector date={new Date(2023, 11, 31)} />);

		// Check previous week button
		const prevWeekBtn = screen.getByLabelText("Previous week");
		expect(prevWeekBtn).toBeTruthy();
		expect(prevWeekBtn.getAttribute("href")).toBe("/week/2023/52");

		const nextWeekBtn = screen.getByLabelText("Next week");
		expect(nextWeekBtn).toBeTruthy();
		expect(nextWeekBtn.getAttribute("href")).toBe("/week/2024/2");

		const textEle = screen.getByText("January 2024 - Week 1");
		expect(textEle).toBeTruthy();
	});
});
