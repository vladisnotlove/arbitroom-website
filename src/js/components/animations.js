import Vector from "../utils/vector";
import throttle from "../utils/trottle";
import cssVars from "../styles/cssVars";
import Cursor from "../utils/cursor";


const ANIMATION_FAST_MS = cssVars.animationNormal * 1000;

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