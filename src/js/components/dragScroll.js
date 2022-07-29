import ScrollBooster from 'scrollbooster';



window.addEventListener('load', () => {

	// add toggleClass behavior

	document.querySelectorAll("[data-drag-scroll]").forEach(elem => {
		const content = elem.querySelector("[data-drag-scroll-content]");

		new ScrollBooster({
			viewport: elem,
			content: content,
			scrollMode: 'native',
		});
	})

});