interface Error {
	path: string;
	message: string;
}

interface OtherError {
	error: string;
	message: string;
}

export const normalizeArrayErrors = (errors: Error[]) => {
	const errMap: { [key: string]: string } = {};

	errors.forEach(err => {
		errMap[err.path] = err.message;
	});

	return errMap;
};

export const normalizeErrors = (errors: OtherError) => {
	console.log(errors);
};
