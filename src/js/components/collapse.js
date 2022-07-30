import cssVars from '../styles/cssVars';


window.addEventListener('load', () => {

	document.querySelectorAll("[data-collapse]").forEach(trigger => {
		const collapses = document.querySelectorAll(trigger.dataset.target);

		collapses.forEach(collapse => {
			const content = collapse.querySelector(".collapse__content");

			if (!collapse.classList.contains("collapse")) {
				console.error(`"${collapse.className}" does not have class "collapse"`)
				return;
			}
			if (!content) {
				console.error(`Element ".collapse__content" is not found`);
				return;
			}

			let heightAutoTimeout = -1;
			let collapseTimeout = -1;

			trigger.addEventListener("click", () => {

				const contentHeight = content.getBoundingClientRect().height;
				const animationTime = Math.sqrt(contentHeight) / 8 * cssVars.animationNormal;

				collapse.style.transition = `height ${animationTime}s`;

				clearTimeout(heightAutoTimeout);
				clearTimeout(collapseTimeout);

				if (trigger.classList.contains("expanded")) {
					collapse.style.height = contentHeight + "px";

					collapseTimeout = setTimeout(() => {
						trigger.classList.remove("expanded");
						collapse.classList.remove("expanded");
						collapse.style.height = "0";
					}, 1);
				}
				else {

					trigger.classList.add("expanded");
					collapse.classList.add("expanded");
					collapse.style.height = contentHeight + "px";

					heightAutoTimeout = setTimeout(() => {
						collapse.style.height = "auto";
					}, animationTime * 1000);
				}
			})
		});
	})


});
