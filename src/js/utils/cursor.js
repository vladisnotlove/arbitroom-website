import Vector from "./vector";

let wasAdd = false;
let position = new Vector(0,0);

class Cursor {

	constructor() {
		if (!wasAdd) {
			document.addEventListener("mousemove", (e) => {
				position = new Vector(e.clientX, e.clientY);
			});

			document.addEventListener("touchmove", (e) => {
				position = new Vector(e.touches[0].clientX, e.touches[0].clientY);
			})
		}
	}

	position () {
		return position;
	}

}
export default Cursor;