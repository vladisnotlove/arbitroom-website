import isEmail from 'validator/es/lib/isEmail';


/**
 *
 * @param {string} str
 */
const trim = (str) => {
	return str.replace(/ +/g, " ").trim();
}

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
	else {
		if (isCheckbox && !value || !isCheckbox && !value.trim()) {
			return {
				isValid: true,
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
		const length = trim(value).length;

		if (!isCheckbox && (length > max || length < min)) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.notRegex !== undefined) {
		const message = field.dataset.notRegexMessage;
		const regex = new RegExp(field.dataset.notRegex);

		if (!isCheckbox && value.match(regex)) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.max !== undefined) {
		const message = field.dataset.maxMessage;
		const max = parseFloat(field.dataset.max);
		const num = parseFloat(value);

		if (!isCheckbox && num > max) {
			return {
				isValid: false,
				message: message,
			}
		}
	}


	for (let i = -1; i < 3; i++) {
		let suffix = "-" + i;
		if (i === -1) {
			suffix = ""
		}

		const regex = field.dataset["regex" + suffix];

		if (regex !== undefined) {
			const message = field.dataset["regexMessage" + suffix];

			if (!isCheckbox && !value.match(regex)) {
				return {
					isValid: false,
					message: message,
				}
			}
		}

	}

	if (field.dataset.confirmPassword !== undefined) {
		const message = field.dataset.confirmPasswordMessage;
		const passwordField = document.querySelector(field.dataset.confirmPassword);
		const passwordInput = passwordField.querySelector("input");

		if (!isCheckbox && input.value !== passwordInput.value) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.maxWordCount !== undefined) {
		const message = field.dataset.maxWordCountMessage;
		const maxCount = parseFloat(field.dataset.maxWordCount);
		const count = trim(value).split(" ").length;

		if (!isCheckbox && count > maxCount) {
			return {
				isValid: false,
				message: message,
			}
		}
	}

	if (field.dataset.wordMinMaxLength !== undefined) {
		const message = field.dataset.wordMinMaxLengthMessage;
		const [min,max] = field.dataset.wordMinMaxLength.split(":").map(str => parseFloat(str));
		const words = trim(value).split(" ");

		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			const length = word.length;

			if (!isCheckbox && (length > max || length < min)) {
				return {
					isValid: false,
					message: message,
				}
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

		// let fieldUpdaters = [];
		// const updateAllFields = () => {
		// 	fieldUpdaters.forEach(updateField => updateField());
		// }
		//
		// let fieldTrimmers = [];
		// const trimAllFields = () => {
		// 	fieldTrimmers.forEach(trimField => trimField());
		// }

		form.querySelectorAll("[data-form-field]").forEach(field => {
			const fieldState = {
				touched: false
			}
			const input = field.querySelector("input");
			const messageContainer = field.querySelector("[data-form-field-message]");

			const updateField = () => {
				const { isValid: isFieldValid, message } = validateField(field, input);
				state.isValid = state.isValid && isFieldValid;

				if (!isFieldValid) {
					field.classList.add("error");
					if (messageContainer) messageContainer.textContent = message;
				}
				else {
					field.classList.remove("error");
					if (messageContainer) messageContainer.textContent = "";
				}
			}
			// fieldUpdaters.push(updateField);
			//
			// const trimField = () => {
			// 	input.value = trim(input.value);
			// }
			// fieldTrimmers.push(trimField);

			input.addEventListener("blur", () => {
				fieldState.touched = true;
				updateField();
				input.value = trim(input.value);
			});

			input.addEventListener("input", () => {
				if (fieldState.touched) updateField();
			});

		});

		// form.addEventListener("submit", (e) => {
		// 	state.isSubmitted = true;
		// 	state.isValid = true;
		// 	updateAllFields();
		// 	if (state.isValid) trimAllFields();
		// 	if (!state.isValid) e.preventDefault();
		// });

	})

});
