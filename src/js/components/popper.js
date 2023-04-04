import cssVars from "../styles/cssVars";
import {createPopper} from "@popperjs/core";

const ANIMATION_SLOW_MS = cssVars.animationSlow * 1000;
const VIEWPORT_PADDING = 12;

window.addEventListener('load', () => {
	document.querySelectorAll('.popper').forEach((element) => {
		const onHover = element.dataset.popperOnHover !== undefined;
		const offset = parseFloat(element.dataset.popperOffset || "0");
		const anchorElement = document.querySelectorAll(element.dataset.popperAnchorElement)

		let overlay;
		let popper;
		let closingTimeout;

		const openPopper = (currentAnchorElement, _options) => {
			const options = {
				disableOverlay: false,
				..._options,
			}

			clearTimeout(closingTimeout);

			if (!popper) popper = createPopper(currentAnchorElement, element, {
				strategy: "fixed",
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [offset, offset],
						},
					},
					{
						name: 'preventOverflow',
						options: {
							padding: VIEWPORT_PADDING
						},
					}
				]
			});

			if (!options.disableOverlay) {
				overlay = document.createElement("div")
				overlay.classList.add("popper-overlay");
				overlay.addEventListener("click", closePopper);
				document.body.prepend(overlay);
			}
			element.classList.add("open");
			element.style.maxWidth = `calc(100vw - ${VIEWPORT_PADDING * 2}px)`;
		}

		const closePopper = () => {
			overlay?.remove();
			overlay = undefined;
			element.classList.remove("open");

			clearTimeout(closingTimeout);
			closingTimeout = setTimeout(() => {
				popper.destroy();
				popper = undefined;
			}, ANIMATION_SLOW_MS)
		}

		if (onHover) {
			anchorElement.forEach(elem => {
				elem.addEventListener("mouseenter", (e) => {
					const isOpen = element.classList.contains("open");

					if (!isOpen) {
						openPopper(e.currentTarget, {disableOverlay: true});
					}
				});
				elem.addEventListener("mouseleave", (e) => {
					const isOpen = element.classList.contains("open");

					if (isOpen) {
						closePopper();
					}
				})
			})
		}
		else {
			anchorElement.forEach(elem => {
				elem.addEventListener("click", (e) => {
					const isOpen = element.classList.contains("open");

					if (!isOpen) {
						openPopper(e.currentTarget);
					}
					else {
						closePopper();
					}
				});
			})
		}

	});

});
