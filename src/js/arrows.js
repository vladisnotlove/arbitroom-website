import {cssVars, debounce} from "./common.js"
const {arrowBorderRadius,colorPrime} = cssVars;

// UTILS


function addArc(pathData, radius) {
	var reL = /^L ?([\d.\-+]+) ([\d.\-+]+) ?/,
		newPathData, curXY, curDir, newXY, newDir,
		sweepFlag, arcXY, arcStartXY;

	function getDir(xy1, xy2) {
		if (xy1.x === xy2.x) {
			return xy1.y < xy2.y ? 'd' : 'u';
		} else if (xy1.y === xy2.y) {
			return xy1.x < xy2.x ? 'r' : 'l';
		}
		throw new Error('Invalid data');
	}

	function captureXY(s, x, y) {
		newXY = {x: +x, y: +y};
		return '';
	}

	function offsetXY(xy, dir, offsetLen, toBack) {
		return {
			x: xy.x + (dir === 'l' ? -offsetLen : dir === 'r' ? offsetLen : 0) * (toBack ? -1 : 1),
			y: xy.y + (dir === 'u' ? -offsetLen : dir === 'd' ? offsetLen : 0) * (toBack ? -1 : 1)
		};
	}

	pathData = pathData.trim().replace(/,/g, ' ').replace(/\s+/g, ' ')
	.replace(/^M ?([\d.\-+]+) ([\d.\-+]+) ?/, function(s, x, y) {
		curXY = {x: +x, y: +y};
		return '';
	});
	if (!curXY) { throw new Error('Invalid data'); }
	newPathData = 'M' + curXY.x + ' ' + curXY.y;

	while (pathData) {
		newXY = null;
		pathData = pathData.replace(reL, captureXY);
		if (!newXY) { throw new Error('Invalid data'); }

		newDir = getDir(curXY, newXY);
		if (curDir) {
			arcStartXY = offsetXY(curXY, curDir, radius, true);
			arcXY = offsetXY(curXY, newDir, radius);
			sweepFlag =
				curDir === 'l' && newDir === 'u' ? '1' :
					curDir === 'l' && newDir === 'd' ? '0' :
						curDir === 'r' && newDir === 'u' ? '0' :
							curDir === 'r' && newDir === 'd' ? '1' :
								curDir === 'u' && newDir === 'l' ? '0' :
									curDir === 'u' && newDir === 'r' ? '1' :
										curDir === 'd' && newDir === 'l' ? '1' :
											curDir === 'd' && newDir === 'r' ? '0' :
												null;
			if (!sweepFlag) { throw new Error('Invalid data'); }
			newPathData += 'L' + arcStartXY.x + ' ' + arcStartXY.y +
				'A ' + radius + ' ' + radius + ' 0 0 ' + sweepFlag + ' ' + arcXY.x + ' ' + arcXY.y;
		}

		curXY = newXY;
		curDir = newDir;
	}
	newPathData += 'L' + curXY.x + ' ' + curXY.y;
	return newPathData;
}


// MAIN

window.addEventListener('load', () => {

	// add arrows

	LeaderLine.positionByWindowResize = false;

	const getLineOptions = (start, end) => {
		const startY = start.offsetTop;
		const endY = end.offsetTop;

		const isDifferentRows = Math.abs(startY - endY) > 2;

		return {
			color: colorPrime,
			size: 2,
			endPlug: "arrow2",
			dash: {len: 9, gap: 6},
			path: "grid",
			...(isDifferentRows ? {
				startSocket: endY > startY ? "bottom" : "top",
				endSocket: startY < endY ? "top" : "bottom",
			} : {
				startSocket: "auto",
				endSocket: "auto",
			}),
		}
	}
	const fixLineStyles = () => {
		document.querySelectorAll('.leader-line .leader-line-line-path:first-child').forEach(line => {
			line.setAttribute('d', addArc(line.getAttribute('d'), arrowBorderRadius));
		});
	}

	const howSteps = document.querySelectorAll('.how__step');
	const lines = [];
	for (let i = 1; i < howSteps.length; i++) {
		const step = howSteps[i];
		const prevStep = howSteps[i - 1];

		lines.push(new LeaderLine(
			prevStep,
			step,
			getLineOptions(prevStep, step)
		));
	}

	fixLineStyles();

	window.addEventListener("resize", debounce(
		() => {
			lines.forEach((line, index) => {
				const options = getLineOptions(line.start, line.end);
				line.setOptions(options);
				line.position();
			})
			fixLineStyles();
		},
		800
	))

});