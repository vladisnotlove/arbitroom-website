import cssVars from "../styles/cssVars";
import {createPopper} from "@popperjs/core";


const ANIMATION_SLOW_MS = cssVars.animationSlow * 1000;

window.addEventListener('load', () => {

	document.querySelectorAll('.popper').forEach((popperMenu) => {
		const onHover = popperMenu.dataset.popperOnHover !== undefined;
		const anchorElement = document.querySelectorAll(popperMenu.dataset.popperAnchorElement)

		let overlay;
		let popper;
		let closingTimeout;

		const openPopper = (currentAnchorElement, _options) => {
			const options = {
				disableOverlay: false,
				..._options,
			}

			clearTimeout(closingTimeout);

			if (!popper) popper = createPopper(currentAnchorElement, popperMenu, {
				strategy: "fixed",
			});

			if (!options.disableOverlay) {
				overlay = document.createElement("div")
				overlay.classList.add("popper-overlay");
				overlay.addEventListener("click", closePopper);
				document.body.prepend(overlay);
			}
			popperMenu.classList.add("open");
		}

		const closePopper = () => {
			overlay?.remove();
			overlay = undefined;
			popperMenu.classList.remove("open");

			clearTimeout(closingTimeout);
			closingTimeout = setTimeout(() => {
				popper.destroy();
				popper = undefined;
			}, ANIMATION_SLOW_MS)
		}

		if (onHover) {
			anchorElement.forEach(elem => {
				elem.addEventListener("mouseenter", (e) => {
					const isOpen = popperMenu.classList.contains("open");

					if (!isOpen) {
						openPopper(e.currentTarget, {disableOverlay: true});
					}
				});
				elem.addEventListener("mouseleave", (e) => {
					const isOpen = popperMenu.classList.contains("open");

					if (isOpen) {
						closePopper();
					}
				})
			})
		}
		else {

			anchorElement.forEach(elem => {
				elem.addEventListener("click", (e) => {
					const isOpen = popperMenu.classList.contains("open");

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
