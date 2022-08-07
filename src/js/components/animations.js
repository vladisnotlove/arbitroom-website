import Vector from "../utils/vector";
import throttle from "../utils/trottle";
import cssVars from "../styles/cssVars";
import Cursor from "../utils/cursor";


const ANIMATION_FAST_MS = cssVars.animationNormal * 1000;


// follow animations

window.addEventListener('load', () => {

	document.querySelectorAll("[data-follow-animation-container]").forEach(container => {

		const target = container.querySelector("[data-follow-animation]");

		let enabled = false;
		let returning = false;

		let mouseX = 0;
		let mouseY = 0;

		let initialX = target.offsetLeft;
		let initialY = target.offsetTop;

		let ballX = initialX;
		let ballY = initialY;

		let speed = 0.1;


		function animate(){

			if (!enabled) return;

			if (returning) {
				let distX = initialX - ballX;
				let distY = initialY - ballY;

				// if returned
				if (Math.abs(distX) < 1 && Math.abs(distY) < 1) {
					enabled = false;

					target.style.left = "";
					target.style.top = "";

					ballX = initialX;
					ballY = initialY;
				}
				else {
					ballX = ballX + (distX * speed);
					ballY = ballY + (distY * speed);

					target.style.left = ballX + "px";
					target.style.top = ballY + "px";

					requestAnimationFrame(animate);
				}
			}

			if (!returning) {
				const containerRect = container.getBoundingClientRect();
				const containerX = containerRect.left;
				const containerY = containerRect.top;

				let mouseInContainerX = mouseX - containerX;
				let mouseInContainerY = mouseY - containerY;

				let distX = mouseInContainerX - ballX;
				let distY = mouseInContainerY - ballY;

				ballX = ballX + (distX * speed);
				ballY = ballY + (distY * speed);

				target.style.left = ballX + "px";
				target.style.top = ballY + "px";

				requestAnimationFrame(animate);
			}
		}
		animate();

		container.addEventListener("mouseenter", () => {
			enabled = true;
			returning = false;
			animate();
		})

		container.addEventListener("mouseleave", () => {
			returning = true;
		})

		container.addEventListener("mousemove", (event) => {
			if (!enabled) {
				enabled = true;
				returning = false;
				animate();
			}

			mouseX = event.clientX;
			mouseY = event.clientY;
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