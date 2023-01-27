import {createPopper} from "@popperjs/core";
import {createPlacementHandler} from "../utils/popperModifiers";
import cssVars from "../styles/cssVars";


const ANIMATION_SLOW_MS = cssVars.animationSlow * 1000;

window.addEventListener('load', () => {

	document.querySelectorAll('.with-tooltip').forEach((trigger) => {
		const placement = trigger.dataset.withTooltipPlacement || "top";
		const tooltip = trigger.querySelector(".tooltip");

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
					createPlacementHandler((placement, element) => {
						element.classList.remove("top");
						element.classList.remove("left");
						element.classList.remove("right");
						element.classList.remove("bottom");
						element.classList.add(placement);
					}),
				],
			});

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
