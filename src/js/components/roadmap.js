window.addEventListener("load", () => {

	const roadmap = document.querySelector(".roadmap");

	if (roadmap) {
		const quarters = roadmap.querySelectorAll(".quarter");
		const quarterEvents = roadmap.querySelectorAll(".events");

		quarters.forEach((quarter) => {
			quarter.addEventListener("click", () => {
				const triggerKey = quarter.getAttribute("data-quarter");
				quarterEvents.forEach(events => {
					const eventsKey = events.getAttribute("data-quarter");
					if (triggerKey !== eventsKey) {
						events.classList.remove("active");
					}
					else {
						events.classList.add("active");
					}
				})
			})
		})

		quarterEvents.forEach((events) => {
			const toggleButtonGroup = events.querySelector(".events__month-filter .toggle-button-group");
			const sections = events.querySelectorAll(".events__section");

			if (toggleButtonGroup) {
				toggleButtonGroup.addEventListener("click", (e) => {
					const toggleButton = e.target.closest(".toggle-button");
					const triggerKey = toggleButton.getAttribute("data-month");

					sections.forEach(section => {
						const sectionKey = section.getAttribute("data-month");
						if (triggerKey === sectionKey || triggerKey === "any") {
							section.classList.add("active");
						}
						else {
							section.classList.remove("active");
						}
					})
				})
			}
		})
	}
})

