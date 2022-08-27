import ScrollBooster from 'scrollbooster';
import isTouchEnabled from "../utils/device/isTouchEnabled";


window.addEventListener('load', () => {

	if (isTouchEnabled()) return;

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