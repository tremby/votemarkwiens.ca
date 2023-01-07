document.addEventListener("liteYoutubeIframeLoaded", (event) => {
	window.dataLayer.push({
		event: "video_load",
		video_id: event.srcElement.videoId,
		video_name: event.srcElement.videoTitle,
		section: el.closest("section")?.id,
	});
});

document.addEventListener("click", (event) => {
	const el = event.target.closest("a, button, summary");
	if (el == null) return;

	switch (el.tagName) {
		case "A":
			window.dataLayer.push({
				event: "link_click",
				link_href: el.href,
				link_text: el.innerText,
				link_title: el.title,
				section: el.closest("section")?.id,
			});
			break;
		case "SUMMARY":
			window.dataLayer.push({
				event: el.closest("details").open ? "details_close" : "details_open",
				details_open: !el.closest("details").open,
				assoc_id: el.closest("[id]")?.id,
				section: el.closest("section")?.id,
			});
			break;
	}
});
