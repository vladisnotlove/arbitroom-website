class Vector {
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	length () {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	normal () {
		const length = this.length();
		return new Vector(
			this.x / length,
			this.y / length,
		)
	}

	add (value1, value2) {
		if (typeof value1 === "object" && typeof value1.x === "number" && typeof value1.y === "number") {
			return new Vector(this.x + value1.x, this.y + value1.y)
		}
		else if (typeof value1 === "number" && typeof value2 === "number") {
			return new Vector(this.x + value1, this.y + value2)
		}
	}

	multiply (value) {
		if (typeof value === "number") {
			return new Vector(this.x * value, this.y * value);
		}
	}

	clone () {
		return new Vector(this.x, this.y);
	}

}

export default Vector;