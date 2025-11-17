 
import { screen, waitFor } from '@testing-library/react';

async function screenFunc(fnName: string, input: string, opts?: any) {
	let v;
	const fn = (screen as any)[fnName];
	await waitFor(() => v = fn(input, opts));
	return v;
}

export async function getByLabelText(t: string) {
	return await screenFunc('getByLabelText', t);
}

export async function getByText(t: string) {
	return await screenFunc('getByText', t);
}

export async function getByRole(t: string, opts?: any) {
	return await screenFunc('getByRole', t, opts);
}

export async function getAllByRole(t: string, opts?: any) {
	return await screenFunc('getAllByRole', t, opts);
}
