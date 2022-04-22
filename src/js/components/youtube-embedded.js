import cssVars from '../styles/cssVars';

window.addEventListener('load', () => {

	const stopVideo = (iframe) => {
		iframe.src = iframe.src;
	}

	document.querySelectorAll("[data-youtube-embedded]").forEach(trigger => {
		const target = document.querySelector(trigger.dataset.target);

		trigger.addEventListener("click", () => {
			if (target) {
				document.querySelectorAll(".youtube-embedded").forEach(other => {
					other.classList.remove("open");
					other.hidden = true;
				});
				target.classList.add("open");
				target.hidden = false;
			}
		})
	})

	document.querySelectorAll(".youtube-embedded").forEach(container => {
		const overlay = container.querySelector(".youtube-embedded__overlay");
		const iframe = container.querySelector("iframe");

		iframe.src = iframe.dataset.src;
		container.hidden = true;

		if (overlay) {
			let hiddenTimeout = -1;
			overlay.addEventListener("click", () => {
				clearTimeout(hiddenTimeout);
				container.classList.remove("open");
				stopVideo(iframe);

				hiddenTimeout = setTimeout(() => {
					container.hidden = true;
				}, cssVars.animationDisappear * 1000);
			})
		}
	})

});