import  'sticksy';


const focusCenterPercents = 0.3;
const minOpacity = 0.2;
const maxOpacity = 1;


const cards = document.querySelector(".goals__cards")

/**
 *
 * @param {Element} elem
 */
const updateOpacity = (elem) => {
	const rect = elem.getBoundingClientRect();
	const center = rect.top + rect.height * 0.5;

	const isInView = center > 0 && center < window.innerHeight;
	if (!isInView) {
		elem.style.opacity = minOpacity;
		return;
	}

	const focusCenter = focusCenterPercents * window.innerHeight;
	const isInFocus = focusCenter > rect.top && focusCenter < rect.bottom;

	if (isInFocus) {
		elem.style.opacity = maxOpacity;
		return;
	}

	const diff = Math.abs(center - focusCenter);
	const coeff = (1 - diff / (window.innerHeight - focusCenter)) * 0.85;

	elem.style.opacity = coeff > 1 ?
		maxOpacity :
		Math.max(coeff, minOpacity);
}

/**
 *
 * @param {NodeListOf<Element>} elems
 */
const updateHighlight = (elems) => {
	let minDiff;
	let closestElem;

	elems.forEach(elem => {
		const rect = elem.getBoundingClientRect();
		const center = rect.top + rect.height * 0.5;
		const focusCenter = focusCenterPercents * window.innerHeight;
		const diff = Math.abs(center - focusCenter);

		if (!minDiff || diff < minDiff) {
			closestElem = elem;
			minDiff = diff;
		}

		elem.classList.remove("highlight");
	});

	if (closestElem && closestElem.style.opacity > 0.65) {
		closestElem.classList.add("highlight");
	}
}


window.addEventListener("load", () => {
	const updateAll = () => {
		const cards = document.querySelectorAll(".goals__card");
		cards.forEach(updateOpacity);
		updateHighlight(cards);
	}

	updateAll();
	window.addEventListener("scroll", updateAll);
})