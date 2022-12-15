


import cssVars from '../styles/cssVars';

window.addEventListener("load", () => {

	document.querySelectorAll("[data-modal]").forEach(trigger => {
		const modal = document.querySelector(trigger.dataset.target);
		const modalStepper = modal?.querySelector(".modal__stepper");

		if (!modal) {
			console.warn("Element", trigger, "has wrong 'data-target' attribute")
			return;
		}

		trigger.addEventListener("click", () => {
			document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("open"));
			document.documentElement.classList.add("modal-open");
			modal.classList.add("open");

			if (modalStepper) {
				const steps = modalStepper.querySelectorAll("[data-stepper-item]");
				steps.forEach(step => step.classList.remove("active"));
				if (steps[0]) steps[0].classList.add("active");
			}
		})
	})

	let bodyRemoveClassTimeout = -1;

	document.querySelectorAll(".modal").forEach(modal => {
		const modalBtns = modal.querySelectorAll(".modal__dialog-close-btn, [data-modal-close]");
		const modalOverlays = modal.querySelectorAll(".modal__overlay");

		const closeModal = () => {
			clearTimeout(bodyRemoveClassTimeout);

			modal.classList.remove("open");
			bodyRemoveClassTimeout = setTimeout(() => {
				document.documentElement.classList.remove("modal-open");
			}, cssVars.animationSlow * 1000);
		}

		if (modalBtns) modalBtns.forEach(modalBtn => modalBtn.addEventListener("click", closeModal));
		if (modalOverlays) modalOverlays.forEach(modalOverlay => modalOverlay.addEventListener("click", closeModal));

		modal.classList.add("ready");
	})
})
