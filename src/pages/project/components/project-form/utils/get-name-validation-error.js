export const getNameValidationError = (name) => {
	let error = null;

	if (name.length < 3) error = 'Название должно содержать хотя бы 3 символа';
	else if (name.length > 1000)
		error = 'Название не должно содержать более 200 символов';
	else if (/^[А-Яа-яЁёa-zA-Z0-9!,.-\s]+$/g.test(name) === false) {
		error = 'В названии допускаются только буквы, цифры и символы (.,-!)';
	}

	return error;
};
