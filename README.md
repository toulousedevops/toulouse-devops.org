# Toulouse DevOps - Site Web

Site web de l'association Toulouse DevOps, la communauté DevOps de Toulouse.

## Stack technique

- **Framework** : [Astro 5](https://astro.build/)
- **CSS** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Package manager** : pnpm

## Prérequis

- Node.js 18+
- pnpm (`npm install -g pnpm`)

## Installation

```bash
# Cloner le projet
git clone https://github.com/toulousedevops/toulousedevops.org.2026.git
cd toulousedevops.org.2026

# Installer les dépendances
pnpm install
```

## Développement

```bash
# Lancer le serveur de développement
pnpm dev
```

Le site sera accessible sur [http://localhost:4321](http://localhost:4321).

## Build

```bash
# Build de production
pnpm build

# Prévisualiser le build
pnpm preview
```

Les fichiers générés se trouvent dans le dossier `dist/`.

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement avec hot reload |
| `pnpm build` | Build de production (avec vérification TypeScript) |
| `pnpm preview` | Prévisualiser le build de production |
| `pnpm generate-assets` | Régénérer les favicons et l'image Open Graph |

## Structure du projet

```
├── public/
│   ├── static/img/          # Images (logo, OG image)
│   ├── favicon.ico          # Favicons
│   └── robots.txt
├── src/
│   ├── components/          # Composants Astro
│   ├── data/                # Données JSON (événements, sponsors, config)
│   ├── layouts/             # Layouts
│   ├── pages/               # Pages du site
│   ├── styles/              # CSS global (Tailwind)
│   └── types/               # Types TypeScript
├── scripts/                 # Scripts utilitaires
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Gestion des événements

Les événements sont définis dans `src/data/events.json`. Pour ajouter un nouvel événement :

```json
{
  "id": "meetup-43",
  "title": "Meetup #43 - Titre du meetup",
  "description": "Description de l'événement",
  "date": "2026-03-20T19:00:00+01:00",
  "endDate": "2026-03-20T22:00:00+01:00",
  "location": {
    "name": "Nom du lieu",
    "address": "Adresse complète",
    "city": "Toulouse"
  },
  "talks": [
    {
      "title": "Titre du talk",
      "speaker": "Nom du speaker",
      "duration": 45
    }
  ],
  "tags": ["kubernetes", "devops"],
  "meetupUrl": "https://www.meetup.com/fr-FR/Toulouse-DevOps/events/...",
  "status": "upcoming"
}
```

- `status: "upcoming"` : événement à venir (le premier sera mis en avant)
- `status: "past"` : événement passé

## Gestion des sponsors

Les sponsors sont définis dans `src/data/sponsors.json`. Pour ajouter un sponsor :

1. Ajouter le logo dans `public/static/img/sponsors/`
2. Ajouter l'entrée dans le JSON :

```json
{
  "name": "Nom du sponsor",
  "logo": "/static/img/sponsors/logo-sponsor.svg",
  "url": "https://sponsor.com",
  "tier": "gold"
}
```

## Déploiement

Le site génère des fichiers statiques. Il peut être déployé sur n'importe quelle plateforme supportant les sites statiques :

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- etc.

## Licence

MIT - Toulouse DevOps
