import cssVars from '../styles/cssVars';
import trottle from '../utils/trottle';
import {min} from '@popperjs/core/lib/utils/math';

const focusTopPercents = 0.2;
const focusBottomPercents = 0.5;
const minOpacity = 0.32;
const maxOpacity = 1;

/**
 *
 * @param {Element} elem
 */
const updateOpacity = (elem, index) => {
	const rect = elem.getBoundingClientRect();
	const center = rect.top + rect.height * 0.5;

	const isInView = center > 0 && center < window.innerHeight;
	if (!isInView) {
		elem.style.opacity = minOpacity;
		return;
	}

	const focusTop = focusTopPercents * window.innerHeight;
	const focusBottom = focusBottomPercents * window.innerHeight;
	const focusHeight = focusBottom - focusTop
	const focusCenter = focusTop + focusHeight * 0.5;

	const isInFocus = center > focusTop && center < focusBottom;

	if (isInFocus) {
		elem.style.opacity = maxOpacity;
		return;
	}

	const diff = Math.abs(center - focusCenter);
	const coeff = focusHeight / 2.3 / diff;

	elem.style.opacity = coeff > 1 ?
		maxOpacity :
		Math.max(coeff, minOpacity);
}

window.addEventListener("load", () => {
	const updateAll = () => {
		document.querySelectorAll(".goals__card").forEach(updateOpacity);
	}

	updateAll();
	window.addEventListener("scroll", updateAll);
})