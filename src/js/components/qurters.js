// import LeaderLine from "leader-line";
// import cssVars from "../styles/cssVars";
//
//
// window.addEventListener("load", () => {
//
// 	document.querySelectorAll(".quarters").forEach(quartersElement => {
//
// 		const quarters = quartersElement.querySelectorAll(".quarter");
// 		let lines = [];
//
// 		const addLines = () => {
// 			for (let i = 1; i < quarters.length; i++) {
// 				const prevQuarter = quarters[i-1];
// 				const quarter = quarters[i];
//
// 				const isPrevActive = prevQuarter.classList.contains("active");
// 				const isActive = quarter.classList.contains("active");
//
// 				const line = new LeaderLine(prevQuarter, quarter, {
// 					startPlug: "behind",
// 					endPlug: "behind",
// 					size: 4,
// 					dash: {len: 8, gap: 8},
// 					gradient: {
// 						startColor: cssVars.colorTertiary,
// 						endColor: cssVars.colorTertiary,
// 						...(isPrevActive && {
// 							startColor: cssVars.colorSecondary,
// 						}),
// 						...(isActive && {
// 							endColor: cssVars.colorSecondary,
// 						})
// 					},
// 				});
// 				line.position();
// 				lines.push(line);
// 			}
// 		}
//
// 		const updateLines = () => {
// 			lines.forEach(line => line.position());
// 		}
//
// 		const removeLines = () => {
// 			lines.forEach(line => line.remove());
// 			lines = [];
// 		}
//
// 		quartersElement.addEventListener("scroll", () => {
// 			updateLines();
// 		})
//
// 		addLines();
// 	})
//
// })
//

import cssVars from "../styles/cssVars";
import debounce from "../utils/debounce";

window.addEventListener("load", () => {

	document.querySelectorAll(".quarters").forEach(quartersElement => {

		const quarters = quartersElement.querySelectorAll(".quarter");
		const gaps = quartersElement.querySelectorAll(".quarters__gap");

		quarters.forEach(quarter => {
			quarter.addEventListener("click", () => {
				quarters.forEach(quarter => {
					quarter.classList.remove("active");
				})
				gaps.forEach(gap => {
					gap.classList.remove("before-active", "after-active");
				})

				quarter.previousElementSibling?.classList.add("before-active");
				quarter.classList.add("active");
				quarter.nextElementSibling?.classList.add("after-active");

				const quartersRect = quartersElement.getBoundingClientRect();
				const quarterRect = quarter.getBoundingClientRect();

				quartersElement.scrollTo({
					left: quarter.offsetLeft - quartersRect.width * 0.5 + quarterRect.width * 0.5,
					behavior: "smooth"
				})
			});
		});

		const fitQuarters = (count) => {

			if (count >= quarters.length) {
				gaps.forEach(gap => {
					gap.style.width = "auto";
				})
			}

			const containerWidth = quartersElement.getBoundingClientRect().width;
			const containerPaddings = parseFloat(getComputedStyle(quartersElement).paddingLeft) + parseFloat(getComputedStyle(quartersElement).paddingRight)
			const rowGap = parseFloat(getComputedStyle(quartersElement).rowGap);

			let restWidth = containerWidth - rowGap * (count - 1) * 2 - containerPaddings;

			for (let i = 0; i < count && i < quarters.length; i++) {
				const quarter = quarters[i];
				restWidth -= quarter.getBoundingClientRect().width;
			}

			const gapWidth = restWidth / (count - 1);

			gaps.forEach(gap => {
				gap.style.minWidth = gapWidth + "px";
			})
		}

		const updateQuarters = () => {
			if (window.innerWidth >= cssVars.laptop) {
				fitQuarters(5);
				return;
			}

			if (window.innerWidth >= 700) {
				fitQuarters(4);
				return;
			}

			fitQuarters(3);
		}

		updateQuarters();
		window.addEventListener("resize", debounce(updateQuarters, 200));
	});

})
