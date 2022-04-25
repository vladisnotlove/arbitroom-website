import isEmail from 'validator/es/lib/isEmail';


// UTILS

/**
 *
 * @param {HTMLElement} field
 * @param {HTMLInputElement} input
 */
const validateField = (field, input) => {
	const isCheckbox = input.type === "checkbox";
	const value = isCheckbox ? input.checked : input.value;

	if (field.dataset.required !== undefined) {
		const message = field.dataset.requiredMessage;
		if (isCheckbox && !value || !isCheckbox && !value.trim()) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.email !== undefined) {
		const message = field.dataset.emailMessage;
		if (!isCheckbox && !isEmail(value)) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.minMaxLength !== undefined) {
		const message = field.dataset.minMaxLengthMessage;
		const [min,max] = field.dataset.minMaxLength.split(":").map(str => parseFloat(str));
		const length = value.trim().length;

		if (!isCheckbox && (length > max || length < min)) {
			return {
				isValid: false,
				message: message,
			}
		}
	}


	if (field.dataset.regex !== undefined) {
		const message = field.dataset.regexMessage;
		const regex = new RegExp(field.dataset.regex);

		if (!isCheckbox && !value.match(regex)) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	return {
		isValid: true,
	}
}

// MAIN

window.addEventListener('load', () => {

	document.querySelectorAll("[data-form]").forEach(form => {
		const state = {
			isSubmitted: false,
			isValid: false,
		}

		let fieldUpdaters = [];
		const updateAllFields = () => {
			fieldUpdaters.forEach(updateField => updateField());
		}

		form.querySelectorAll("[data-form-field]").forEach(field => {
			const input = field.querySelector("input");
			const messageContainer = field.querySelector("[data-form-field-message]");

			const updateField = () => {
				const { isValid: isFieldValid, message } = validateField(field, input);
				state.isValid = state.isValid && isFieldValid;

				if (!isFieldValid) {
					field.classList.add("error");
					messageContainer.textContent = message;
				}
				else {
					field.classList.remove("error");
					messageContainer.textContent = "";
				}
			}
			fieldUpdaters.push(updateField);

			input.addEventListener("input", () => {
				if (state.isSubmitted) updateField();
			})
		});

		form.addEventListener("submit", (e) => {
			state.isSubmitted = true;
			state.isValid = true;
			updateAllFields();
			if (!state.isValid) e.preventDefault();
		});

	})

});
