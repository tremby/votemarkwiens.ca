function openTarget() {
	if (!window.location.hash) return;
	const target = document.getElementById(window.location.hash.substring(1));
	if (target == null) return;
	const details = target.tagName === "DETAILS" ? target : target.querySelector("details");
	if (details == null) return;
	details.open = true;
}
openTarget();
