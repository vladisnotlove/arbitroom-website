import {sameWidth} from "../utils/popperModifiers";
import {disablePopper, enablePopper} from "../utils/popperUtils";
import {createPopper} from "@popperjs/core";

window.addEventListener("load", () => {
	document.querySelectorAll(".select").forEach(select => {
		const input = select.querySelector("input");

		const trigger = select.querySelector(".select__trigger");
		const triggerValue = select.querySelector(".select__trigger-value");
		const menu = select.querySelector(".select__menu");
		const menuItems = select.querySelectorAll(".select__menu-item");

		if (!input) {
			console.error("'.select' has no input", input);
			return;
		}
		if (!(trigger instanceof HTMLElement)) {
			console.error("'.select' has no trigger", trigger);
			return;
		}
		if (!(triggerValue instanceof HTMLElement)) {
			console.error("'.select' has no triggerValue", triggerValue);
			return;
		}
		if (!(menu instanceof HTMLElement)) {
			console.error("'.select' has no menu", menu);
			return;
		}

		const popper = createPopper(trigger, menu, {
			strategy: "fixed",
			modifiers: [
				sameWidth
			]
		});

		const isMenuOpen = () => {
			return select.classList.contains("open");
		}

		const openMenu = () => {
			select.classList.add("open");
			menu.classList.add("open");
			enablePopper(popper);
			popper.update();
			input.focus();
		};

		const closeMenu = () => {
			select.classList.remove("open");
			menu.classList.remove("open");
			disablePopper(popper);
			input.blur();
		};

		const updateSelected = () => {
			let displayValue = "";
			const value = input.value;
			menuItems.forEach(menuItem => {
				if (menuItem.getAttribute("data-value") === value) {
					menuItem.classList.add("selected");
					displayValue = menuItem.textContent || "";
				} else {
					menuItem.classList.remove("selected");
				}
			})
			triggerValue.textContent = displayValue;
		}

		const onClickOutside = (e) => {
			if (e.target instanceof HTMLElement && e.target.closest(".select__menu")) return;
			closeMenu();
			document.documentElement.removeEventListener("click", onClickOutside);
		}

		trigger.addEventListener("click", (e) => {
			if (!isMenuOpen()) {
				openMenu();
				e.stopPropagation(); // to prevent triggering of document click
				document.documentElement.addEventListener("click", onClickOutside);
			}
		});
		menu.addEventListener("click", (e) => {
			if (!(e.target instanceof Element)) return;
			const menuItem = e.target.closest(".select__menu-item");
			if (!(menuItem instanceof HTMLElement)) return;
			const value = menuItem.dataset.value;
			input.value = value || "";
			input.dispatchEvent(new Event('change'));
			input.focus(); // need because click
			closeMenu();
		});
		input.addEventListener("change", () => {
			updateSelected();
		})

		updateSelected();
	});
});