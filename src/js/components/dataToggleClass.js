import throttle from '../utils/trottle';
import debounce from '../utils/debounce';

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
