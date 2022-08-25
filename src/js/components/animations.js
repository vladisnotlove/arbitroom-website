import Vector from "../utils/vector";
import throttle from "../utils/trottle";
import cssVars from "../styles/cssVars";
import Cursor from "../utils/cursor";


const ANIMATION_FAST_MS = cssVars.animationNormal * 1000;


// follow animations

window.addEventListener('load', () => {

	const cursor = new Cursor();

	document.querySelectorAll("[data-follow-animation-container]").forEach(container => {

		const speed = 0.04;
		const maxSpeed = 7;

		const target = container.querySelector("[data-follow-animation]");

		let animating = false;
		let returning = false;

		let initialX = target.offsetLeft;
		let initialY = target.offsetTop;

		let ballX = initialX;
		let ballY = initialY;

		function startAnimation() {
			if (!animating) {
				animating = true;
				animate();
			}
		}

		function stopAnimation() {
			animating = false;
		}

		function animate() {

			if (!animating) return;

			let distX;
			let distY;

			if (returning) {
				distX = initialX - ballX;
				distY = initialY - ballY;

				// if returned
				if (Math.abs(distX) < 1 && Math.abs(distY) < 1) {
					stopAnimation();
					return;
				}
			}
			else {
				const containerRect = container.getBoundingClientRect();
				const containerX = containerRect.left;
				const containerY = containerRect.top;

				let mouseInContainerX = cursor.position().x - containerX;
				let mouseInContainerY = cursor.position().y - containerY;

				distX = mouseInContainerX - ballX;
				distY = mouseInContainerY - ballY;
			}

			let delta = new Vector(distX * speed, distY * speed).normalTo(maxSpeed);

			ballX = ballX + delta.x;
			ballY = ballY + delta.y;

			target.style.left = ballX + "px";
			target.style.top = ballY + "px";

			requestAnimationFrame(animate);
		}

		container.addEventListener("mouseenter", () => {
			returning = false;
			startAnimation();
		})

		container.addEventListener("mouseleave", () => {
			returning = true;
			startAnimation();
		})

		container.addEventListener("mousemove", (event) => {
			returning = false;
			startAnimation();
		})

		window.addEventListener("resize", () => {
			initialX = target.offsetLeft;
			initialY = target.offsetTop;
		})
	})

})


// window.addEventListener('load', () => {
//
// 	// promo cards
//
// 	const cards = document.querySelectorAll('.advantages__card ');
// 	const cursor = new Cursor();
//
// 	cards.forEach(card => {
// 		const speed = 10;
// 		const maxShift = 10;
//
// 		let center;
//
// 		const set = () => {
// 			const rect = card.getBoundingClientRect();
// 			center = new Vector(
// 				rect.x + rect.width * 0.5,
// 				rect.y + rect.height * 0.5,
// 			)
// 		}
//
// 		const update = () => {
// 			const cursorPosition = cursor.position();
//
// 			const position = new Vector(
// 				cursorPosition.x - center.x,
// 				cursorPosition.y - center.y
// 			).multiply(0.05);
//
// 			card.style.transform = `translate(${position.x}px, ${position.y}px)`;
// 		}
//
// 		const reset = () => {
// 			card.style.transform = "";
// 			center = undefined;
// 		}
//
//
// 		card.addEventListener('mouseenter', set)
// 		card.addEventListener("mousemove", throttle(update, ANIMATION_FAST_MS))
// 		card.addEventListener('mouseleave', reset)
//
// 	})
//
// });