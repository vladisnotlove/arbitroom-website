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

		if (!modalBtn) {
			log.elementNotFound(".modal__dialog-close-btn");
			return;
		}

		modalBtn.addEventListener("click", () => {
			clearTimeout(bodyRemoveClassTimeout);

			modal.classList.remove("open");
			bodyRemoveClassTimeout = setTimeout(() => {
				body.classList.remove("modal-open");
			}, cssVars.animationDisappear * 1000);
		});
	})
})