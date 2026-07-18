# OpenAI Build Week 2026 change record

## Pre-existing baseline

Repository snapshot reviewed at the start of the Build Week extension:

- root `index.html`: static presentation page and incomplete Tawk.to embed;
- `public/index.html`: static presentation page;
- `ghidul-tau-usvt.png`: project mascot;
- `README.md`: concept description containing technology and integration claims not represented in the repository code;
- no functional question-answering logic, structured knowledge layer, localization or source attribution.

The existing repository history is intentionally retained. This file distinguishes the prior concept from the functionality added during the hackathon submission period.

## Build Week extension

### Product and design

- Created a complete bilingual student-guide experience.
- Designed responsive desktop and mobile layouts.
- Added a focused question flow, quick topics, official source directory and project context.
- Reused the pre-existing mascot while creating a new visual system.

### Information quality

- Added a bilingual structured knowledge base.
- Restricted factual entries to official USVT sources.
- Added direct citations and update dates to matched answers.
- Added a safe fallback when a question cannot be verified.

### Engineering

- Replaced the incomplete third-party chat embed with local, reproducible retrieval logic.
- Added Romanian/English localization without a framework dependency.
- Added query normalization, keyword scoring and safe HTML escaping.
- Added accessibility landmarks, labels, keyboard focus and reduced-motion support.
- Removed any runtime dependency on API keys or paid services.

### Documentation

- Rewrote the README to match the code that actually runs.
- Documented the pre-existing baseline and new submission-period work.
- Added local setup, test prompts, limitations and official sources.

## Important limitation

The public prototype is an informational navigation layer, not an official admissions decision system. Regulations, fees, dates and individual eligibility must always be confirmed on the linked official USVT pages.
