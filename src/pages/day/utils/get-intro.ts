export function getFirstName(displayName: string) {
	if (!displayName) {
		return '';
	}

	let name = displayName;
	const parts = name.split(' ');
	if (parts) {
		name = parts[0];
	}
	return name;
}
