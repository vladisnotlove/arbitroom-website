
export const cssVars = {
	colorPrime: '#CEE44A',
	arrowBorderRadius: 40,
}

// MAIN

window.addEventListener('load', () => {

	// add toggleClass behavior

	document.querySelectorAll("[data-toggle-class]").forEach(elem => {
		const className = elem.dataset.toggleClass;
		const target = elem.dataset.target;

		if (className && target) {
			elem.addEventListener("click", (e) => {
				document.querySelectorAll(target).forEach(targetElem => {
					targetElem.classList.toggle(className);
				})
			})
		}
	});


});
