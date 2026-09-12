# Client logos

Drop a logo here named to match the `logo` field in `clients` (src/data.js):

    itd-cloud.svg
    idogcam.svg
    helium-mobile.svg
    florida-lantern-project.svg

SVG is preferred; PNG works. The build reads the intrinsic size (SVG viewBox or
PNG header) and writes explicit width/height so the strip never shifts as the
images load. They render at 34px tall, desaturated, and come to full colour on
hover.

Until a file exists the client's name renders as a text wordmark instead, so
the strip is never broken. Only use logos you have permission to display.
