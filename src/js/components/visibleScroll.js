

window.addEventListener('load', () => {

	document.querySelectorAll(".visible-scroll").forEach((visibleScroll) => {

		const container = visibleScroll.querySelector(".visible-scroll__container");
		const content = visibleScroll.querySelector(".visible-scroll__content");
		const clone = content.cloneNode(true);
		clone.id = undefined;
		clone.classList.add("clone");

		container.after(clone);

		container.addEventListener("scroll", () => {
			const offset = container.scrollLeft;
			clone.style.left = "-" + offset + "px";
		})
	})

});