
export const cssVars = {
	colorPrime: '#CEE44A',
	arrowBorderRadius: 40,
	animationAppear: 0.25,  // s
}

// UTILS

export const throttle = (func, wait, options) => {
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

export const debounce = (func, wait, immediate) => {
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
	elementNotFound: (name) => {
		console.error(`Element \"${name}\" is not found`);
	}
}

/**
 *
 * @param {[{element: Element, name: string }]} data
 * @return true - if all elements are valid
 */
export const checkElementsNotNull = (data) => {
	try {
		let areValid = true;
		data.forEach(({element, name}) => {
			if (!element) {
				log.elementNotFound(name);
				areValid = false;
			}
		});
		return areValid;
	}
	catch (e) {
		console.error(e);
	}

}

// MAIN

window.addEventListener('load', () => {

	// add toggleClass behavior

	document.querySelectorAll("[data-toggle-class]").forEach(elem => {
		const className = elem.dataset.toggleClass;
		const reason = elem.dataset.reason;
		const targets = elem.dataset.target === "!self" ?
			[elem] :
			document.querySelectorAll(elem.dataset.target);

		if (className && targets) {
			switch (reason) {
				case "collapsed-hor": {
					const onResize = () => {
						const isOverflowed = elem.clientWidth < elem.scrollWidth;

						if (isOverflowed) {
							targets.forEach(target => {
								target.classList.add(className);
							})
						}
						else {
							targets.forEach(target => {
								if (target.classList.contains(className)) {
									target.classList.remove(className);
								}
							});
						}
					}
					onResize();
					window.addEventListener("resize", debounce(onResize, 1000));
					break;
				}
				case "scrolled-y": {
					const onScroll = () => {
						const rect = elem.getBoundingClientRect()
						const neededScrollY = rect.top + rect.height * 0.5 + window.scrollY;
						if (window.scrollY + window.innerHeight * 0.8 > neededScrollY) {
							targets.forEach(target => {
								target.classList.add(className);
							})
						}
						else {
							targets.forEach(target => {
								if (target.classList.contains(className)) {
									target.classList.remove(className);
								}
							});
						}
					}
					window.addEventListener("scroll", throttle(onScroll, 200));
					break;
				}
				case "click":
				default: {
					elem.addEventListener("click", (e) => {
						targets.forEach(target => {
							target.classList.toggle(className);
						})
					})
				}
			}
		}
	});

});
