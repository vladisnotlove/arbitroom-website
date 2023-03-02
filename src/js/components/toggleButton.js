window.addEventListener("load", () => {
	const toggleButtonGroups = document.querySelectorAll(".toggle-button-group");

	toggleButtonGroups.forEach(toggleButtonGroup => {
		toggleButtonGroup.addEventListener("click", (e) => {
			const clickedItem = e.target.closest(".toggle-button");
			if (clickedItem) {
				toggleButtonGroup
					.querySelectorAll(".toggle-button")
					.forEach(item => item.classList.remove("active"));
				clickedItem.classList.add("active");
			}
		})
	})
})
