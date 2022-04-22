
const makeActive = (tabContents, tabMenuItems, tabIndex) => {
	if (tabIndex >= tabContents.length || tabIndex >= tabMenuItems.length) return;

	tabMenuItems.forEach(tabMenuItem => tabMenuItem.classList.remove("active"));
	tabContents.forEach(tabContent => tabContent.classList.remove("active"));
	tabMenuItems[tabIndex].classList.add("active");
	tabContents[tabIndex].classList.add("active");
}

window.addEventListener("load", () => {

	document.querySelectorAll(".tariffs").forEach(tariffs => {
		const tabMenuItems = tariffs.querySelectorAll(".tariffs__tabs-menu-item");
		const tabContents = tariffs.querySelectorAll(".tariffs__card");

		makeActive(tabContents, tabMenuItems, 0);

		tabMenuItems.forEach((tabMenuItem, tabIndex) => {
			if (tabIndex >= tabContents.length) return;

			tabMenuItem.addEventListener("click", () => {
				makeActive(tabContents, tabMenuItems, tabIndex);
			})
		})

	})

})