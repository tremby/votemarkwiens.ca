const pug = require("pug");
const fs = require("fs");

const calendarUrl = new URL("https://calendar.google.com/calendar/render");
calendarUrl.searchParams.set("action", "TEMPLATE");
calendarUrl.searchParams.set("text", "Vote Mark Wiens for Director in the REBGV 2023 election");
calendarUrl.searchParams.set("dates", "20230113T200000Z/20230120T200000Z");
calendarUrl.searchParams.set("details", "Log in to your REBGV profile and find the page for the Board of Directors election. Vote for Mark Wiens, and have a great day! https://www.votemarkwiens.ca");

fs.writeFileSync("dist/index.html", pug.renderFile("src/index.pug", {
	imgixSrc,
	imgixSrcset,
	nominalDimensions,
	calendarUrl,
	widthsFull: [320, 360, 420, 576, 640, 788, 801, 1024, 1280, 1680, 1920, 2560],
	instagram: {
		href: "https://www.instagram.com/markwiensrealestate/",
		label: "@markwiensrealestate",
	},
	tel: {
		href: "tel:+17788407653",
		label: "778 840-7653",
	},
	email: {
		href: "mailto:mark@markwiens.ca",
		label: "mark@markwiens.ca",
	},
	gaId: "G-XW2146Z6WM",
}), "utf-8");

/**
 * Get a URL to an imgix image
 */
function imgixSrc(src, width, options) {
	const url = new URL(`https://votemarkwiens.imgix.net/${src}`);
	for (const [key, value] of Object.entries({
		auto: "compress,format",
		q: 75,
		...options,
		w: width,
	})) {
		url.searchParams.set(key, value);
	}
	return url.toString();
}

/**
 * Get a set of imgix image URLs
 */
function imgixSrcset(src, widths, options) {
	return widths.map((width) => `${imgixSrc(src, width, options)} ${width}w`).join(", ");
}

/**
 * Get nominal dimensions of an imgix image
 *
 * Its source crop is taken into account if specified via the `rect` option.
 */
function nominalDimensions(dimensions, widths, options) {
	const aspect = getImgixAspect(dimensions, options);
	const width = widths[widths.length - 1];
	const height = Math.round(width / aspect);
	return { width, height };
}

/**
 * Get the aspect ratio of an imgix image
 *
 * Its source crop is taken into account if specified via the `rect` option.
 */
function getImgixAspect(dimensions, options) {
	if ("rect" in options) {
		const [_x, _y, width, height] = options.rect.split(",");
		return parseInt(width) / parseInt(height);
	}
	return dimensions[0] / dimensions[1];
}
