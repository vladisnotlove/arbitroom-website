window.addEventListener("load", () => {
	const promoModal = document.getElementById("promoModal");
	const disabled = Boolean(window.localStorage.getItem("promo-modal-disabled"));

	if (promoModal && !disabled) {

		// open promo
		promoModal.classList.add("open");
		document.body.classList.add("modal-open");

		const checkbox = promoModal.querySelector(".promo-modal__disable-reminder input");
		checkbox.addEventListener("change", (e) => {
			const checked = e.target.checked;
			window.localStorage.setItem("promo-modal-disabled", checked ? "true" : "");
		})
	}


})