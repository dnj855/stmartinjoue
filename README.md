# St-Martin joue

Site de l'association **St-Martin joue**, club de jeux de société à
Saint-Martin-de-l'If (Seine-Maritime). En ligne sur
[stmartinjoue.fr](https://stmartinjoue.fr/).

Page unique en HTML/CSS, construite avec Vite et Tailwind CSS v4. Pas de
framework JS : `src/main.js` ne contient que le menu mobile et le calcul de la
prochaine soirée.

## Développement

```bash
pnpm install
pnpm run dev      # serveur local sur http://localhost:5173/index.html
pnpm run build    # build de production dans ./dist
pnpm run preview  # sert le build de production
pnpm run format   # Prettier + tri des classes Tailwind
```

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui build et
publie `dist/` sur GitHub Pages. Il n'y a pas d'environnement de préproduction :
une fusion dans `main` part directement en production.

## Structure

| Fichier | Rôle |
|---|---|
| `src/index.html` | tout le contenu du site, découpé en sections ancrées |
| `src/main.js` | menu mobile, calcul de la prochaine soirée |
| `src/style.css` | thème Tailwind v4 (`@theme`), animations et classes maison |
| `src/public/img/` | images et favicon, servis à la racine du site |

## Licence

Le code est parti du template
[vite-tailwind-nojs-starter](https://github.com/kometolabs/vite-tailwind-nojs-starter)
de Kometo Labs, sous licence MIT (voir `LICENSE`).
