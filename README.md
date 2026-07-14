# Git & GitHub

Interaktiv introduktion til Git og GitHub — bygget med [Astro](https://astro.build).

## Kom i gang

```bash
npm install
npm run dev
```

Åbn [http://localhost:4321](http://localhost:4321) i din browser.

## Scripts

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start udviklingsserver |
| `npm run build` | Byg produktionsversion til `dist/` |
| `npm run preview` | Forhåndsvis produktionsbuild |

## Emner

- **Commits** — conventional commits, staging og push (`/commits`)
- **Branches** — feature branches og merge-workflow (`/branches`)
- **Pull Requests** — code review og merge til main (`/pull-requests`)
- **Merge** — strategier og løsning af konflikter (`/merge`)
- **Issues** — opgavesporing, sprint-board og PR-kobling (`/issues`)
- **Releases** — Git-tags, GitHub Releases og GitHub Actions (`/releases`)

## Projektstruktur

```
src/
  content/          # Tekster, trin og quiz-data
  components/react/ # Interaktive React-komponenter
  layouts/          # Fælles sidelayout
  pages/            # Astro-sider
  styles/           # Global CSS
```

## Docker / Dokploy

Produktion kører som statisk Astro-build bag nginx — samme mønster som øvrige Mercantec-apps.

**Dokploy:**

```bash
docker compose up -d --build
```

Routing: `git.mercantec.tech` → Traefik → container port 80.

**Lokal test med Docker:**

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

Åbn [http://localhost:8080](http://localhost:8080) (eller sæt `WEB_HOST_PORT`).

**Miljøvariabler:**

| Variabel | Standard | Beskrivelse |
|----------|----------|-------------|
| `FRONTEND_DOMAIN` | `git.mercantec.tech` | Traefik Host-regel |
| `WEB_HOST_PORT` | `8080` | Host-port ved lokal override |

