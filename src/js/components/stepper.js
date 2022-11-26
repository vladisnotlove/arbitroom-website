import log from '../utils/log';

window.addEventListener("load", () => {

	document.querySelectorAll("[data-stepper]").forEach(stepper => {
		const steps = stepper.querySelectorAll("[data-stepper-item]");
		const nextBtns = stepper.querySelectorAll("[data-stepper-next]");
		const stepBtns = stepper.querySelectorAll("[data-stepper-to]");

		if (!steps) {
			log.elementNotFound("[data-stepper-item]");
			return;
		}

		nextBtns.forEach(nextBtn => {
			nextBtn.addEventListener("click", () => {
				const activeStepIndex = [...steps].findIndex(step => step.classList.contains("active"));
				const nextActiveStepIndex = activeStepIndex + 1;
				const nextActiveStep = steps[nextActiveStepIndex];

				if (nextActiveStep) {
					steps.forEach(step => step.classList.remove("active"));
					nextActiveStep.classList.add("active");
				}
			})
		});

		stepBtns.forEach(stepBtn => {
			stepBtn.addEventListener("click", () => {
				const nextActiveStepIndex = parseInt(stepBtn.dataset.stepperTo);
				const nextActiveStep = steps[nextActiveStepIndex];

				if (nextActiveStep) {
					steps.forEach(step => step.classList.remove("active"));
					nextActiveStep.classList.add("active");
				}
			})
		})
	})

})
