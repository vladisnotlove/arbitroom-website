import {createPopper} from "@popperjs/core";
import {createPlacementHandler} from "../utils/popperModifiers";
import cssVars from "../styles/cssVars";

const ANIMATION_SLOW_MS = cssVars.animationSlow * 1000;
const VIEWPORT_PADDING = 12;

const createTooltip = (text) => {
	const tooltipContent = document.createElement("div");
	tooltipContent.classList.add("tooltip__content");
	tooltipContent.textContent = text;

	const tooltip = document.createElement("div");
	tooltip.classList.add("tooltip");
	tooltip.appendChild(tooltipContent);

	return tooltip;
}

window.addEventListener('load', () => {

	document.querySelectorAll('.with-tooltip').forEach((trigger) => {
		const placement = trigger.dataset.withTooltipPlacement || "top";
		const text = trigger?.dataset?.withTooltipText || "";

		const tooltip = trigger.querySelector(".tooltip") || createTooltip(text);

		let popper;
		let disappearTimeoutId = -1;

		trigger.addEventListener("mouseenter", () => {
			if (tooltip.parentElement !== document.body) {
				document.body.appendChild(tooltip);
			}

			if (!popper) popper = createPopper(trigger, tooltip, {
				placement: placement,
				strategy: "absolute",
				modifiers: [
					{
						name: "flip",
						options: {
							fallbackPlacements: ['auto'],
						},
					},
					{
						name: 'preventOverflow',
						options: {
							padding: VIEWPORT_PADDING
						},
					},
					createPlacementHandler((placement, element) => {
						element.classList.remove("top");
						element.classList.remove("left");
						element.classList.remove("right");
						element.classList.remove("bottom");
						element.classList.add(placement);
					}),
				],
			});

			tooltip.style.maxWidth = `calc(100vw - ${VIEWPORT_PADDING * 2}px)`;
			tooltip.classList.add("show");
			tooltip.classList.remove("fade-out-slow");
			clearTimeout(disappearTimeoutId);

			popper.update();
		});

		trigger.addEventListener("mouseleave", () => {
			tooltip.classList.add("fade-out-slow");

			disappearTimeoutId = setTimeout(() => {
				tooltip.classList.remove("show");
				if (popper) {
					popper.destroy();
					popper = undefined;
				}
			}, ANIMATION_SLOW_MS)
		});

	});

});
