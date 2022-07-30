import log from '../utils/log';
import cssVars from '../styles/cssVars';

window.addEventListener("load", () => {
	const body = document.body;

	document.querySelectorAll("[data-modal]").forEach(trigger => {
		const target = document.querySelector(trigger.dataset.target);

		trigger.addEventListener("click", () => {
			if (target) {
				document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("open"));
				body.classList.add("modal-open");
				target.classList.add("open");
			}
		})
	})

	let bodyRemoveClassTimeout = -1;

	document.querySelectorAll(".modal").forEach(modal => {
		const modalBtn = modal.querySelector(".modal__dialog-close-btn");
		const modalOverlay = modal.querySelector(".modal__overlay");

		if (!modalBtn) {
			log.elementNotFound(".modal__dialog-close-btn");
			return;
		}

		if (!modalOverlay) {
			log.elementNotFound(".modal__overlay");
			return;
		}

		const closeModal = () => {
			clearTimeout(bodyRemoveClassTimeout);

			modal.classList.remove("open");
			bodyRemoveClassTimeout = setTimeout(() => {
				body.classList.remove("modal-open");
			}, cssVars.animationSlow * 1000);
		}

		modalOverlay.addEventListener("click", closeModal);
		modalBtn.addEventListener("click", closeModal);

		modal.classList.add("ready");
	})
})