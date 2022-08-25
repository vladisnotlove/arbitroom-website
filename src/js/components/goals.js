import  'sticksy';


const focusTopPercents = 0.25;
const focusBottomPercents = 0.45;
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
		elem.classList.remove("highlight");
		return;
	}

	const focusTop = focusTopPercents * window.innerHeight;
	const focusBottom = focusBottomPercents * window.innerHeight;
	const focusHeight = focusBottom - focusTop
	const focusCenter = focusTop + focusHeight * 0.5;

	const isInFocus = center > focusTop && center < focusBottom;

	if (isInFocus) {
		elem.style.opacity = maxOpacity;
		elem.classList.add("highlight");
		return;
	}

	const diff = Math.abs(center - focusCenter);
	const coeff = 1 - diff / cards.clientHeight;


	console.log(diff);
	console.log(cards.clientHeight);

	elem.style.opacity = coeff > 1 ?
		maxOpacity :
		Math.max(coeff, minOpacity);

	elem.classList.remove("highlight");
}

window.addEventListener("load", () => {
	const updateAll = () => {
		document.querySelectorAll(".goals__card").forEach(updateOpacity);
	}

	updateAll();
	window.addEventListener("scroll", updateAll);
})