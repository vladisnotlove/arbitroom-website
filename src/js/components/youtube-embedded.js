
window.addEventListener('load', () => {

	const stopVideo = (iframe) => {
		iframe.src = iframe.src;
	}

	document.querySelectorAll(".youtube-embedded").forEach(container => {
		const overlay = container.querySelector(".youtube-embedded__overlay");
		const iframe = container.querySelector("iframe");

		if (overlay) {
			overlay.addEventListener("click", () => {
				container.classList.remove("open");
				stopVideo(iframe);
			})
		}
	})

});