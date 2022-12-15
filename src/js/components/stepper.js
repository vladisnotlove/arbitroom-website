import log from '../utils/log';

window.addEventListener("load", () => {

	document.querySelectorAll("[data-stepper]").forEach(stepper => {
		const steps = stepper.querySelectorAll("[data-stepper-item]");
		const nextBtns = stepper.querySelectorAll("[data-stepper-next]");
		const stepBtns = stepper.querySelectorAll("[data-stepper-to]");

		if (!steps) {
			console.warn("Stepper element", stepper, "has no steps (elements with 'data-stepper-item' attribute)")
			return;
		}

		if (nextBtns) nextBtns.forEach(nextBtn => {
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

		if (stepBtns) stepBtns.forEach(stepBtn => {
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
