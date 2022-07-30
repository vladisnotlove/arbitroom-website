import {createPopper} from "@popperjs/core";
import {createPlacementHandler} from "../utils/popperModifiers";
import cssVars from "../styles/cssVars";


const ANIMATION_SLOW_MS = cssVars.animationSlow * 1000;

window.addEventListener('load', () => {

	document.querySelectorAll('.with-tooltip').forEach((trigger) => {
		const placement = trigger.dataset.withTooltipPlacement || "top";
		const tooltip = trigger.querySelector(".tooltip");

		const popper = createPopper(trigger, tooltip, {
			placement: placement,
			strategy: "fixed",
			modifiers: [
				{
					name: "flip",
					options: {
						fallbackPlacements: ['auto'],
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

		let disappearTimeoutId = -1;

		trigger.addEventListener("mouseenter", () => {
			tooltip.classList.add("show");
			tooltip.classList.remove("fade-out-slow");
			clearTimeout(disappearTimeoutId);
			popper.update();
		});

		trigger.addEventListener("mouseleave", () => {
			tooltip.classList.add("fade-out-slow");

			disappearTimeoutId = setTimeout(() => {
				tooltip.classList.remove("show");
			}, ANIMATION_SLOW_MS)
		});

	});

});