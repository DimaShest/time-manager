export const deboounce = (fn, timer) => {
	let timerId;

	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(fn, timer, ...args);
	};
};
