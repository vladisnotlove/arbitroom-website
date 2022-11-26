const log = {
	elementNotFound: (name) => {
		console.error(`Element \"${name}\" is not found`);
	},
	customMessage: (message) => {
		console.error(message);
	}
}

/**
 *
 * @param {[{element: Element, name: string }]} data
 * @return true - if all elements are valid
 */
export const checkElementsNotNull = (data) => {
	try {
		let areValid = true;
		data.forEach(({element, name}) => {
			if (!element) {
				log.elementNotFound(name);
				areValid = false;
			}
		});
		return areValid;
	}
	catch (e) {
		console.error(e);
	}

}

export default log;
