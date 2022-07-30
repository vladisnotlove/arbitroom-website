export const sameWidth = {
	name: "sameWidth",
	enabled: true,
	phase: "beforeWrite",
	requires: ["computeStyles"],
	fn: ({ state }) => {
		state.styles.popper.width = `${state.rects.reference.width}px`;
	},
	effect: ({ state }) => {
		state.elements.popper.style.width = `${
			state.elements.reference.offsetWidth
		}px`;
	}
};

/**
 * @param {(placement: string, element: HTMLElement) => void} onPlacementChange
 * @returns {{phase: string, effect: effect, name: string, enabled: boolean, requires: string[]}}
 */
export const createPlacementHandler = (onPlacementChange) => {
	return {
		name: "placementHandler",
		enabled: true,
		phase: "beforeWrite",
		requires: ["computeStyles"],
		fn: ({ state }) => {
			onPlacementChange(state.placement, state.elements.popper);
		}
	}
}