
export const cssVars = {
	colorPrime: '#CEE44A',
	arrowBorderRadius: 40,
}

// UTILS

export function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

export function debounce(func, wait, immediate) {
	let timeout;

	return function executedFunction() {
		const context = this;
		const args = arguments;

		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
};

export const log = {
	elementNotExists: (name) => {
		console.error(`Element \"${name}\" is not found`)
	}
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
