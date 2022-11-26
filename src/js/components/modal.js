import log from '../utils/log';
import cssVars from '../styles/cssVars';

window.addEventListener("load", () => {

	document.querySelectorAll("[data-modal-trigger]").forEach(trigger => {
		const modal = document.querySelector(trigger.dataset.modalTrigger);
		const modalStepper = modal.querySelector("[data-modal-stepper]");

		trigger.addEventListener("click", () => {
			if (modal) {
				document.querySelectorAll("[data-modal]").forEach(modal => modal.classList.remove("open"));
				document.documentElement.classList.add("modal-open");
				modal.classList.add("open");

				const steps = modalStepper.querySelectorAll("[data-stepper-item]");
				steps.forEach(step => step.classList.remove("active"));
				if (steps[0]) steps[0].classList.add("active");
			}
		})
	})

	let bodyRemoveClassTimeout = -1;

	document.querySelectorAll("[data-modal]").forEach(modal => {
		const modalBtns = modal.querySelectorAll("[data-modal-close]");
		const modalOverlays = modal.querySelectorAll("[data-modal-overlay]");

		if (!modalBtns || modalBtns.length === 0) {
			log.elementNotFound("[data-modal-close]");
			return;
		}

		if (!modalOverlays || modalOverlays.length === 0) {
			log.elementNotFound("[data-modal-overlay]");
			return;
		}

		const closeModal = () => {
			clearTimeout(bodyRemoveClassTimeout);

			modal.classList.remove("open");
			bodyRemoveClassTimeout = setTimeout(() => {
				document.documentElement.classList.remove("modal-open");
			}, cssVars.animationSlow * 1000);
		}

		modalBtns.forEach(modalBtn => modalBtn.addEventListener("click", closeModal));
		modalOverlays.forEach(modalOverlay => modalOverlay.addEventListener("click", closeModal));

		modal.classList.add("ready");
	})
})
