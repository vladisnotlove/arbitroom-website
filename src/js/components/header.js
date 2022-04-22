import debounce from '../utils/debounce';
import {checkElementsNotNull} from '../utils/log';
import cssVars from '../styles/cssVars';


window.addEventListener('load', () => {
	const body = document.body;

	const headerWrapper = document.getElementById("headerWrapper");
	const header = headerWrapper.querySelector(".header:not(.variant-collapsed)");
	const headerCollapsed = headerWrapper.querySelector(".header.variant-collapsed");
	const headerBurger = headerWrapper.querySelector(".header__burger");

	const menu = document.getElementById("menu");
	const menuOverlay = document.getElementById("menuOverlay");
	const menuCloseBtn = menu.querySelector(".menu__close-btn");

	const elementsNotNull = checkElementsNotNull([
		{ element: headerWrapper, name: "#headerWrapper"},
		{ element: headerBurger, name: ".header__burger"},
		{ element: menu, name: "#menu"},
		{ element: menuOverlay, name: "#menuOverlay"},
		{ element: menuCloseBtn, name: ".menu__close-btn"},
	])
	if (!elementsNotNull) return;


	let bodyEnableScrollTimeout = -1;
	const openMenu = () => {
		clearTimeout(bodyEnableScrollTimeout);
		menu.classList.add("open");
		menuOverlay.classList.add("open");
		body.classList.add("disable-scroll");
	}
	const closeMenu = () => {
		clearTimeout(bodyEnableScrollTimeout);
		menu.classList.remove("open");
		menuOverlay.classList.remove("open");
		bodyEnableScrollTimeout = setTimeout(() => {
			body.classList.remove("disable-scroll");
		}, cssVars.animationDisappear * 1000);
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
		let isOverflowed = false;
		[...header.children].forEach(element => {
			if (element.clientWidth < element.scrollWidth) isOverflowed = true;
		})

		if (isOverflowed) {
			header.classList.add("hidden");
			headerCollapsed.classList.remove("hidden");
		}
		else {
			headerCollapsed.classList.add("hidden");
			header.classList.remove("hidden");
		}
	}
	onResize();
	window.addEventListener("resize", debounce(onResize, 1000));

});
