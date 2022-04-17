import {debounce, checkElementsNotNull} from './common.js';

// MAIN

window.addEventListener('load', () => {
	const headerWrapper = document.getElementById("headerWrapper");
	const headerBurger = headerWrapper.querySelector(".header__burger");
	const headerNav = headerWrapper.querySelector(".header__nav");

	const menu = document.getElementById("menu");
	const menuOverlay = document.getElementById("menuOverlay");
	const menuCloseBtn = menu.querySelector(".menu__close-btn");

	const elementsNotNull = checkElementsNotNull([
		{ element: headerWrapper, name: "#headerWrapper"},
		{ element: headerBurger, name: ".header__burger"},
		{ element: headerNav, name: ".header__nav"},
		{ element: menu, name: "#menu"},
		{ element: menuOverlay, name: "#menuOverlay"},
		{ element: menuCloseBtn, name: ".menu__close-btn"},
	])
	if (!elementsNotNull) return;

	const openMenu = () => {
		menu.classList.add("open");
		menuOverlay.classList.add("open");
	}
	const closeMenu = () => {
		menu.classList.remove("open");
		menuOverlay.classList.remove("open");
	}
	headerBurger.addEventListener("click", openMenu);
	menuOverlay.addEventListener("click", closeMenu);
	menuCloseBtn.addEventListener("click", closeMenu);


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
	onScroll();
	window.addEventListener("scroll", onScroll);


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
	onResize();
	window.addEventListener("resize", debounce(onResize, 1000));

});
