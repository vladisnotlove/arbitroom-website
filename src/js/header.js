import {debounce, log} from './common.js';

// MAIN

window.addEventListener('load', () => {
	const headerWrapper = document.getElementById("headerWrapper");
	const headerBurger = headerWrapper.querySelector(".header__burger");
	const headerNav = headerWrapper.querySelector(".header__nav");

	const menu = document.getElementById("menu");
	const menuCloseBtn = menu.querySelector(".menu__close-btn")

	let elementMissed = false;

	if (!headerWrapper) {
		log.elementNotExists("#headerWrapper");
		elementMissed = true;
	}
	if (!headerBurger) {
		log.elementNotExists(".header__burger");
		elementMissed = true;
	}
	if (!headerNav) {
		log.elementNotExists(".header__nav");
		elementMissed = true;
	}
	if (!menu) {
		log.elementNotExists("#menu");
		elementMissed = true;
	}
	if (!menuCloseBtn) {
		log.elementNotExists(".menu__close-btn");
		elementMissed = true;
	}

	if (elementMissed) return;

	const onBurgerClick = () => {
		menu.classList.add("open");
	}

	headerBurger.addEventListener("click", onBurgerClick);

	const onScroll = () => {
		if (window.scrollY > 1) {
			headerWrapper.classList.add("scrolled");
		}
		else {
			if (headerWrapper.classList.contains("scrolled")) {
				headerWrapper.classList.remove("scrolled");
			}
		}
	}

	const onResize = () => {
		const isOverflowed = headerNav.clientWidth < headerNav.scrollWidth;

		if (isOverflowed) {
			headerWrapper.classList.add("collapsed");
		}
		else {
			if (headerWrapper.classList.contains("collapsed")) {
				headerWrapper.classList.remove("collapsed");
			}
		}
	}

	onScroll();
	onResize();
	window.addEventListener("scroll", onScroll);
	window.addEventListener("resize", debounce(onResize, 1000));
});
