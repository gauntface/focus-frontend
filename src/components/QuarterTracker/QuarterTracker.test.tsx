import { beforeEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QuarterTracker } from "./QuarterTracker";

describe("QuarterTracker", () => {
	beforeEach(() => {
		cleanup();
	});

	test("renders QuarterTracker at start of quarter", () => {
		const { getByTestId } = render(
			<QuarterTracker date={new Date(2006, 0, 2)} />,
		);

		const progressText = screen.getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = screen.getByText("1 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = getByTestId("qt__prog");
		expect(progressBar.style.width).toBe("0%");
	});

	test("renders QuarterTracker in mid quarter", () => {
		const { getByTestId } = render(
			<QuarterTracker date={new Date(2006, 1, 1)} />,
		);

		const progressText = screen.getByText("Progress in Q1 '06");
		expect(progressText).toBeTruthy();

		const weeksText = screen.getByText("5 of 12");
		expect(weeksText).toBeTruthy();

		const progressBar = getByTestId("qt__prog");
		expect(progressBar.style.width).toBe("33%");
	});
});
