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
