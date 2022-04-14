//import Popper from './popper.min.js';


// MAIN

window.addEventListener('load', () => {
	const dropdownOverlay = document.getElementById("dropdownOverlay");
	const components = [];

	document.querySelectorAll(".dropdown").forEach((dropdown) => {
		const trigger = dropdown.querySelector(".dropdown__trigger");
		const menu = dropdown.querySelector(".dropdown__menu");

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

		trigger?.addEventListener("click", () => {
			dropdownOverlay.classList.toggle("active");
			menu.classList.toggle("open");
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
