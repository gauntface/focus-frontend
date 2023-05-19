import { render } from '@testing-library/react';
import { NotesArea } from '../../components/NotesArea/NotesArea';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('NotesArea', () => {
	it('renders empty NotesArea', () => {
		const changeMock = jest.fn();
		const { container } = render(<NotesArea note="" name="example" rows={2} onChange={changeMock} />);

		const notesareaDiv = container.querySelector('.c-notesarea') as HTMLElement;
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector('textarea') as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");
	});

	it('renders NotesArea with note', () => {
		const changeMock = jest.fn();
		const { container } = render(<NotesArea note="This is an example note." name="example" rows={2} onChange={changeMock} />);

		const notesareaDiv = container.querySelector('.c-notesarea') as HTMLElement;
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector('textarea') as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("This is an example note.");
	});

	it('renders NotesArea disabled while loading', () => {
		const changeMock = jest.fn();
		const { container } = render(<NotesArea loading={true} note="This is an example note." name="example" rows={50} onChange={changeMock} />);

		const notesareaDiv = container.querySelector('.c-notesarea') as HTMLElement;
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector('textarea') as HTMLTextAreaElement;
		expect(textarea).toBeFalsy();

		const skeletonDivs = notesareaDiv.querySelectorAll('.c-notesarea--skeleton') as NodeListOf<HTMLElement>;
		expect(skeletonDivs.length).toEqual(50);
	});

	it('accepts user input with no existing note', async () => {
		const user = userEvent.setup();

		const changeMock = jest.fn();
		const { container } = render(<NotesArea note="" name="example" rows={2} onChange={changeMock} />);

		const notesareaDiv = container.querySelector('.c-notesarea') as HTMLElement;
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector('textarea') as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");

		await user.click(textarea);
		await user.keyboard('This is an example note.');

		expect(changeMock).toBeCalledTimes(24);
		expect(changeMock.mock.lastCall).toEqual(["."]);
	});

	it('accepts user input updating note', async () => {
		const user = userEvent.setup();

		let note = "";
		const onChange = jest.fn((value) => {
			note += value;
		});

		const { container } = render(<NotesArea note={note} name={"example"} rows={2} onChange={onChange} />);

		const notesareaDiv = container.querySelector('.c-notesarea') as HTMLElement;
		expect(notesareaDiv).toBeTruthy();

		const textarea = notesareaDiv.querySelector('textarea') as HTMLTextAreaElement;
		expect(textarea).toBeTruthy();
		expect(textarea.disabled).toEqual(false);
		expect(textarea.name).toEqual("example-text");
		expect(textarea.rows).toEqual(2);
		expect(textarea.value).toEqual("");

		await user.click(textarea);
		await user.keyboard('This is an example note.');

		expect(onChange).toBeCalledTimes(24);
		expect(note).toEqual('This is an example note.');
	});
});
