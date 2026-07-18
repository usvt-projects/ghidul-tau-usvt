# Ghidul tău USVT – AI Student Guide

A bilingual, source-grounded university information assistant for prospective and current students of the King Michael I University of Life Sciences of Timișoara (USVT).

This repository contains the **OpenAI Build Week 2026 extension** of a pre-existing concept. The original repository was a single presentation page. The Build Week version adds a complete responsive interface, Romanian/English localization, natural-language topic matching, a verified knowledge layer, source attribution, uncertainty handling, accessibility improvements, and technical documentation.

## What the project does

- Answers common questions about admissions, faculties, study programs, campus facilities, selected programs, university background and contact information.
- Supports Romanian and English throughout the interface and answers.
- Shows the official USVT source and the date associated with every matched answer.
- Refuses to invent an answer when no verified knowledge entry matches the question.
- Runs as a lightweight static website without user accounts, tracking, API keys or paid infrastructure.

## Build Week 2026 scope

### Before the submission period

The repository contained:

- a basic HTML presentation page;
- the project mascot;
- a placeholder Tawk.to embed;
- a conceptual README.

### Built during OpenAI Build Week 2026

- a new responsive product interface;
- bilingual UI and question flows;
- a source-grounded knowledge base built from official USVT pages;
- a deterministic retrieval and intent-matching layer;
- official-source links and update dates in responses;
- a safe fallback for questions that cannot be verified;
- mobile layouts and accessibility features;
- updated setup, testing and contribution documentation.

Only the work added during the submission period is presented for Build Week judging.

## How Codex and GPT-5.6 were used

Codex with GPT-5.6 was used as the primary development environment for the Build Week extension. It helped:

1. audit the pre-existing repository and distinguish implemented features from conceptual claims;
2. design the information architecture and bilingual product experience;
3. research and structure public information from official USVT sources;
4. implement the HTML, CSS, JavaScript retrieval logic and localization;
5. check JavaScript syntax, responsive behavior assumptions and documentation;
6. keep the project honest about uncertainty, sources and the pre-existing baseline.

Product positioning, source selection, institutional context and final editorial decisions were directed by Clement Lupu, the project creator and a Social Media Administrator in the USVT Image Office.

## Technology

- Semantic HTML5
- Modern CSS (responsive layout, custom properties, reduced-motion support)
- Vanilla JavaScript
- Local structured knowledge base
- GitHub and Vercel for source control and deployment
- Codex with GPT-5.6 for Build Week development

No OpenAI API key is required to run the prototype. GPT-5.6 was used through Codex to build and refine the project; user questions are answered locally from the verified knowledge layer so the public demo remains free and reproducible.

## Run locally

No build step or package installation is required.

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser.

You may also open `index.html` directly, although a local web server is recommended.

## Test the assistant

Try these questions in Romanian or English:

- `Cum mă înscriu la USVT?`
- `Ce facultăți sunt la USVT?`
- `Ce programe de studiu există?`
- `Ce facilități are campusul?`
- `How long is the Veterinary Medicine program?`
- `Where can I find official contact information?`
- `Care este vremea mâine?` — expected result: safe fallback to the official website.

## Project files

```text
index.html              Main application and semantic structure
styles.css              Responsive visual system
app.js                  Localization, retrieval and answer rendering
data.js                 Verified bilingual knowledge entries and sources
ghidul-tau-usvt.png     Project mascot
BUILD_WEEK_LOG.md       Baseline and Build Week change record
```

## Official information sources

- [USVT admissions](https://usvt.ro/admitere)
- [USVT study programs](https://usvt.ro/courses)
- [USVT campus](https://usvt.ro/)
- [About USVT](https://usvt.ro/despre)
- [Official contact page](https://usvt.ro/contact)

Knowledge entries include their own direct source URLs in `data.js`. The prototype does not replace official regulations, admission documents or administrative confirmation.

## Privacy and accessibility

- No personal data is collected or stored.
- No analytics or third-party chat widget is loaded.
- Keyboard focus states, semantic landmarks and a skip link are included.
- The interface respects the operating system's reduced-motion preference.
- The layout adapts to desktop and mobile screens.

## License

MIT License. See [LICENSE](LICENSE).
