Vote Mark Wiens website
=======================

Icons
-----

Pull from https://fonts.google.com/icons?icon.style=Outlined with

- Fill 0
- Weight 200
- Grade 0
- Optical size 24

Then download as SVG.

Images
------

Source images are in a separate directory,
and are uploaded to S3 so Imgix can access them.

Dev
---

Run `npm run dev`.
You need to restart it if there are any new files in `static`.

Build
-----

Run `npm run build`,
and then everything which needs to be deployed is in `dist`.
