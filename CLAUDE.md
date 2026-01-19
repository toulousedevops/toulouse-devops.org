# CLAUDE.md - Contexte du projet Toulouse DevOps

Ce fichier contient les informations de contexte pour reprendre le développement du site avec Claude.

## Présentation

Site web de l'association **Toulouse DevOps**. Nous organisons des rencontres "Meetup" autour de la thématique DevOps à Toulouse. L'ambiance est professionnelle mais décontractée — on parle tech sérieusement, mais autour d'une boisson et de pizzas.

## Stack technique

- **Framework** : Astro 5
- **CSS** : Tailwind CSS 4 (configuration via `@theme` dans le CSS)
- **Package manager** : pnpm

## Charte graphique

### Couleurs principales (logo)

| Nom | Hex | Usage |
|-----|-----|-------|
| Bleu principal | `#0e2d5a` | Titres, éléments principaux, footer |
| Rouge accent | `#c83737` | CTA, badges, éléments d'attention |

### Déclinaisons du bleu

| Nom | Hex | Usage |
|-----|-----|-------|
| Bleu clair | `#1a4a8a` | Hover, liens, accents secondaires |
| Bleu pâle | `#e8eef5` | Fonds de sections, cartes |

### Déclinaisons du rouge

| Nom | Hex | Usage |
|-----|-----|-------|
| Rouge clair | `#e85555` | Hover sur CTA |
| Rouge pâle | `#fdf2f2` | Alertes, notifications |

### Neutres (Light mode)

| Nom | Hex | Usage |
|-----|-----|-------|
| Gris texte | `#374151` | Corps de texte |
| Gris clair | `#6b7280` | Texte secondaire, légendes |
| Fond de page | `#fafbfc` | Background général |
| Surface | `#ffffff` | Cartes, conteneurs |
| Bordure | `#e5e7eb` | Bordures, séparateurs |

### Dark mode

Le site supporte 3 modes : **light**, **dark** et **system** (par défaut).

| Variable | Light | Dark |
|----------|-------|------|
| `--color-primary` | `#0e2d5a` | `#5b8fd9` |
| `--color-primary-light` | `#1a4a8a` | `#7ba7e8` |
| `--color-primary-pale` | `#e8eef5` | `#1e3a5f` |
| `--color-accent` | `#c83737` | `#e85555` |
| `--color-text` | `#374151` | `#e5e7eb` |
| `--color-background` | `#fafbfc` | `#0f172a` |
| `--color-surface` | `#ffffff` | `#1e293b` |

Le thème est géré via :
- Classes CSS `.light` / `.dark` sur `<html>`
- Media query `prefers-color-scheme` pour le mode système
- LocalStorage pour la persistance du choix utilisateur

### Typographie

| Usage | Police |
|-------|--------|
| Titres | Ubuntu Bold |
| Sous-titres | Ubuntu Medium |
| Corps de texte | Inter (ou system-ui en fallback) |
| Code | JetBrains Mono |

### Composants

- **CTA principal** : fond rouge `#c83737`, texte blanc, coins arrondis 8px
- **Bouton secondaire** : fond bleu `#0e2d5a`, texte blanc
- **Bouton outline** : bordure bleu `#0e2d5a`, fond transparent
- **Badges thématiques** : fond bleu pâle, texte bleu
- **Cartes** : fond blanc, coins arrondis 12px, ombre légère

## Contenu

### Baseline / Tagline

> "La communauté DevOps de Toulouse — Meetups, talks et partage de bonnes pratiques"

### À propos

> Toulouse DevOps rassemble les passionnés d'infrastructure, d'automatisation et de culture DevOps dans la Ville Rose. Nous organisons des meetups gratuits avec des talks techniques, des retours d'expérience et du networking. Que tu sois dev, ops, SRE ou simplement curieux, tu es le bienvenu !

### Ce qu'on fait

- Meetups (talks + networking)
- Thématiques : Kubernetes, CI/CD, observabilité, platform engineering, IaC, SRE...
- Format : 1-2 talks de 30-45min + discussions

## Liens & Réseaux sociaux

| Réseau | URL |
|--------|-----|
| Meetup | https://www.meetup.com/fr-FR/Toulouse-DevOps/ |
| X/Twitter | https://x.com/toulousedevops |
| Bluesky | https://bsky.app/profile/toulouse-devops.org |
| Instagram | https://instagram.com/toulouse-devops |
| LinkedIn | https://linkedin.com/company/toulouse-devops |
| GitHub | https://github.com/toulousedevops |

## Structure des données

### Événements (`src/data/events.json`)

```typescript
interface Event {
  id: string;                    // Ex: "meetup-42"
  title: string;                 // Ex: "Meetup #42 - Platform Engineering"
  description: string;
  date: string;                  // ISO 8601: "2026-02-20T19:00:00+01:00"
  endDate: string;
  location: {
    name: string;                // Ex: "Epitech Toulouse"
    address: string;
    city: string;
  };
  talks: Array<{
    title: string;
    speaker: string;
    duration: number;            // En minutes
  }>;
  tags: string[];                // Ex: ["kubernetes", "gitops"]
  meetupUrl: string;
  status: "upcoming" | "past";
}
```

### Sponsors (`src/data/sponsors.json`)

```typescript
interface Sponsor {
  name: string;
  logo: string;                  // Path vers le logo
  url: string;
  tier: "gold" | "silver";
}
```

### Configuration (`src/data/site.json`)

Contient le nom du site, la tagline, la description et les liens vers les réseaux sociaux.

## SEO

Le site inclut :

### Balises meta
- `description`, `author`, `keywords`, `robots`
- Balises géographiques (`geo.region`, `geo.placename`)
- Open Graph complet (titre, description, image, dimensions)
- Twitter Cards (summary_large_image)

### Données structurées JSON-LD
- **Organization** : infos sur l'association, liens sociaux
- **WebSite** : nom, URL, description
- **Event** : pour chaque événement à venir (titre, date, lieu, prix gratuit)

### Fichiers
- `robots.txt` avec lien vers sitemap
- `sitemap-index.xml` généré automatiquement par `@astrojs/sitemap`

## Contraintes techniques

- **Mobile-first** et responsive
- **Accessibilité** : contrastes OK, navigation clavier, alt sur images, skip link
- **Performance** : score Lighthouse > 90
- **SEO** : balises meta, JSON-LD, sitemap, robots.txt
- **Dark mode** : support light/dark/system avec persistance
- **Pas de JavaScript inutile** (profiter du SSG d'Astro)

## Ton & Personnalité

- Professionnel mais pas corporate
- Friendly et inclusif
- Touches d'humour geek bienvenues

## Commandes utiles

```bash
pnpm dev              # Développement
pnpm build            # Build production
pnpm preview          # Prévisualiser le build
pnpm generate-assets  # Régénérer favicons + OG image
```

## Notes pour le développement

- Les classes Tailwind utilisent les variables CSS définies dans `src/styles/global.css` via `@theme`
- Exemple : `bg-primary`, `text-accent`, `bg-primary-pale`, etc.
- Le widget événements affiche : 1 prochain événement mis en avant + 2 événements passés
- Les sponsors sont actuellement en placeholder (à remplacer par les vrais logos)
