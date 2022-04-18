import {checkElementsNotNull} from './common.js';

// MAIN

window.addEventListener('load', () => {
	const dropdownOverlay = document.getElementById("dropdownOverlay");
	const components = [];

	const elementsNotNull = checkElementsNotNull([
		{ element: dropdownOverlay, name: "#dropdownOverlay"},
	])
	if (!elementsNotNull) return;

	document.querySelectorAll(".dropdown").forEach((dropdown) => {
		const trigger = dropdown.querySelector(".dropdown__trigger");
		const menu = dropdown.querySelector(".dropdown__menu");

		const elementsNotNull = checkElementsNotNull([
			{ element: trigger, name: ".dropdown__trigger"},
			{ element: menu, name: ".dropdown__menu"},
		])
		if (!elementsNotNull) return;

		const popper = Popper.createPopper(trigger, menu, {
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
			],
			strategy: "fixed",
		});
		menu.classList.add("ready");

		trigger?.addEventListener("click", () => {
			menu.classList.toggle("open");
			menu.classList.contains("open") ?
				dropdownOverlay.classList.add("active") :
				dropdownOverlay.classList.remove("active");
			popper.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: true },
				],
			}));
			popper.update();
		});

		components.push({
			dropdown,
			trigger,
			menu,
			popper
		})
	});

	dropdownOverlay.addEventListener("click", () => {
		components.forEach(({menu, popper}) => {
			menu.classList.remove("open");
			popper.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: false },
				],
			}));
		});
		dropdownOverlay.classList.remove("active");
	});

});
