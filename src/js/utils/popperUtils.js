
const enablePopper = (popper) => {
	popper.setOptions((options) => ({
		...options,
		modifiers: [
			...(options.modifiers || []),
			{ name: 'eventListeners', enabled: true },
		],
	}));

	popper.update();
}

const disablePopper = (popper) => {
	popper.setOptions((options) => ({
		...options,
		modifiers: [
			...(options.modifiers || []),
			{ name: 'eventListeners', enabled: false },
		],
	}));
}

export { enablePopper, disablePopper }