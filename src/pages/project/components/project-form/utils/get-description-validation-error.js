export const getDescriptionValidationError = (description) => {
	if (description.length === 0) return null;

	let error = null;

	if (description.length > 1000)
		error = 'Описание не должно содержать более 2000 символов';
	else if (/^[\sА-Яа-яЁёa-zA-Z0-9!,.-:()\t]+$/g.test(description) === false)
		error = 'В описании допускаются только буквы, цифры и символы (.,-!:())';

	return error;
};
