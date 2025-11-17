import { beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotesArea } from "./NotesArea";

describe("NotesArea", () => {
	beforeEach(() => {
		cleanup();
	});

	test("renders empty NotesArea", () => {
		const changeMock = vi.fn();
		const componentRender = render(
			<NotesArea note="" name="example" rows={2} onChange={changeMock} />,
		);

		const notesareaDiv = componentRender.getByTestId("notes-area");
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");
	});

	test("renders NotesArea with note", () => {
		const changeMock = vi.fn();
		const componentRender = render(
			<NotesArea
				note="This is an example note."
				name="example"
				rows={2}
				onChange={changeMock}
			/>,
		);
		const notesareaDiv = componentRender.getByTestId("notes-area");
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("This is an example note.");
	});

	test("renders NotesArea disabled while loading", () => {
		const changeMock = vi.fn();
		const componentRender = render(
			<NotesArea
				loading={true}
				note="This is an example note."
				name="example"
				rows={50}
				onChange={changeMock}
			/>,
		);
		const notesareaDiv = componentRender.getByTestId("notes-area");
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		expect(textarea).toBeFalsy();

		const skeletonDivs = screen.getAllByTestId("notes-area--skeleton");
		expect(skeletonDivs.length).toEqual(50);
	});

	test("accepts user input with no existing note", async () => {
		const user = userEvent.setup();
		const changeMock = vi.fn();
		const componentRender = render(
			<NotesArea note="" name="example" rows={2} onChange={changeMock} />,
		);
		const notesareaDiv = componentRender.getByTestId("notes-area");
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");

		await user.click(textarea);
		await user.keyboard("This is an example note.");
		expect(changeMock).toBeCalledTimes(24);
		expect(changeMock.mock.lastCall).toEqual(["."]);
	});

	test("accepts user input updating note", async () => {
		const user = userEvent.setup();
		let note = "";
		const onChange = vi.fn((value) => {
			note += value;
		});
		const componentRender = render(
			<NotesArea note={note} name={"example"} rows={2} onChange={onChange} />,
		);
		const notesareaDiv = componentRender.getByTestId("notes-area");
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");

		await user.click(textarea);
		await user.keyboard("This is an example note.");
		expect(onChange).toBeCalledTimes(24);
		expect(note).toEqual("This is an example note.");
	});
});
