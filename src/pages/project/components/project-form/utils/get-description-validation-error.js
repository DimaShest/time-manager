export const getDescriptionValidationError = (name) => {
	if (name.length === 0) return null;

	let error = null;

	if (name.length > 1000) error = 'Описание не должно содержать более 2000 символов';
	else if (/^[А-Яа-яЁёa-zA-Z0-9!,.-:]+$/g.test(name) === false)
		error = 'В описании допускаются только буквы, цифры и символы (.,-!:)';

	return error;
};
