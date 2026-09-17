# Honda Kaduwela — Make it your day

A complete private pitch concept for Honda Kaduwela / Macro Enterprises. The homepage takes
one Dio 125 from ignition through the local ride, feature discovery, finish selection,
purchase intent, handover, care and the Kaduwela branch. It uses a bounded scroll-directed
hero and has no persistent animation or WebGL dependency.

`/model.html` and `/model-110.html` are full specification-sheet pages for the Dio 125 and
Dio 110 respectively, each showing both trims (125: Standard/H-Smart, 110: Standard/DLX),
the full feature list, complete performance specs and available finishes, sourced from
Honda Sri Lanka's official product pages. The two pages cross-link via a model switcher.
The Dio 110 colour gallery currently uses placeholder colour-preview chips rather than
official product photography — see `assets/incoming/SOURCES.md` for the pending image URLs.

## Run locally

```bash
npm install
npm run dev
```

Production build and plain Node preview:

```bash
npm run build
PORT=4188 npm start
```

`npm start` reads `PORT` and defaults to 4188 on a plain Node/Docker-compatible host. The
site has no backend, storage, analytics, cookies or other environment variables.

## Use boundary

This is a private concept. Its Macro mark and campaign/showroom scenes are concept
materials. Honda Sri Lanka product images are retained with their source record for this
private pitch and require explicit clearance before public deployment. Product, branch
stock, price, services, contact priority and final brand assets require customer
confirmation. See `assets/incoming/SOURCES.md` and `STUDIO.md`.
