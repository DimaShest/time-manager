import { useState } from 'react';

export const useHint = () => {
	const [hint, setHint] = useState('');

	const onHint = (type, hint) => {
		if (type === 'mouseover') {
			setHint(hint);
		} else if (type === 'mouseout') {
			setHint('');
		}
	};

	return { hint, onHint };
};
