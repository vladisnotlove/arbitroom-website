

window.addEventListener("load", () => {

	document.querySelectorAll(".collapse-table").forEach((collapseTable) => {
		const collapseBtn = collapseTable.querySelector(".collapse-table__collapse-btn button")
		const expandBtn = collapseTable.querySelector(".collapse-table__expand-btn button");

		expandBtn?.addEventListener("click", () => {
			collapseTable.classList.add("expand");
		})

		collapseBtn?.addEventListener("click", () => {
			collapseTable.classList.remove("expand");
		})
	})

});