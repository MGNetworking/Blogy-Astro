# Portfolio Personnel - Blog

Un portfolio moderne et performant développé avec Astro, permettant de publier des articles techniques et de présenter mes projets.

## 📋 Sommaire

- [🚀 Aperçu](#-aperçu)
  - [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📁 Structure du projet](#-structure-du-projet)
- [🚦 Installation et développement](#-installation-et-développement)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
- [🧞 Commandes](#-commandes)
- [✍️ Ajouter un nouvel article](#️-ajouter-un-nouvel-article)
- [🚀 CI/CD & Déploiement](#-cicd--déploiement)
- [📈 Performance](#-performance)
- [🎨 Personnalisation](#-personnalisation)
  - [Thème](#thème)
  - [Navigation](#navigation)
  - [Footer](#footer)
- [📄 License](#-license)
- [🤝 Contribution](#-contribution)
- [📞 Contact](#-contact)

## 🚀 Aperçu

Ce site statique combine performance et simplicité pour créer un portfolio professionnel avec une section blog intégrée. Il est automatiquement déployé sur GitHub Pages à chaque modification grâce à **GitHub Actions**.

### ✨ Fonctionnalités

- **Blog intégré** : Rédaction d'articles en Markdown
- **Performance optimisée** : Site statique généré avec Astro
- **Responsive design** : Adapté à tous les écrans
- **SEO optimisé** : Meta tags, sitemap et structure sémantique
- **CI/CD automatisé** : Déploiement automatique via **GitHub Actions**
- **Thème sombre/clair** : Basculement automatique selon les préférences utilisateur

## 🛠️ Technologies utilisées

- **[Astro](https://astro.build/)** - Framework de génération de sites statiques
- **TypeScript** - Typage statique pour plus de robustesse
- **Markdown** - Format de rédaction des articles
- **CSS/SCSS** - Styles personnalisés et responsive
- **GitHub Actions** - Pipeline CI/CD automatisé
- **GitHub Pages** - Hébergement gratuit

## 📁 Structure du projet

```
├── .github/
│   └── workflows/
│       └── deploy.yml        # Pipeline GitHub Actions
├── src/
│   ├── components/
│   │   ├── TagFilter.astro
│   │   ├── about.astro
│   │   ├── articleComponent.astro
│   │   ├── articleList.astro
│   │   ├── contact.astro
│   │   ├── hero.astro
│   │   ├── projectList.astro
│   │   ├── projetComponent.astro
│   │   └── skills.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── article/
│   │   │   └── [...slug].astro
│   │   ├── articlesPage.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   └── projet/
│   │       └── [...slug].astro
│   ├── services/
│   │   └── github.js
│   ├── shared/
│   │   ├── Footer.astro
│   │   └── Navbar.astro
│   ├── styles/
│   │   └── global.css
│   ├── type/
│   │   └── github.ts
│   └── utils/
│       └── tagService.js
├── public/            # Assets statiques
├── astro.config.mjs   # Configuration Astro
└── package.json
```

## 🚦 Installation et développement

### Prérequis

- Node.js (version 18+)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/[votre-username]/[nom-du-repo].git
cd [nom-du-repo]

# Installer les dépendances
npm install
# ou
yarn install
```

### Commandes disponibles

```bash
# Lancer le serveur de développement
npm run dev
# Accessible sur http://localhost:4321

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Vérification TypeScript
npm run check
```

## 🧞 Commandes

Toutes les commandes sont exécutées depuis la racine du projet, depuis un terminal :

| Commande                  | Action                                                         |
| :------------------------ | :------------------------------------------------------------- |
| `npm install`             | Installe les dépendances                                       |
| `npm run dev`             | Démarre le serveur de développement local sur `localhost:4321` |
| `npm run build`           | Construit votre site de production dans `./dist/`              |
| `npm run preview`         | Prévisualise votre build localement, avant déploiement         |
| `npm run astro ...`       | Exécute les commandes CLI comme `astro add`, `astro check`     |
| `npm run astro -- --help` | Affiche l'aide pour l'utilisation de l'Astro CLI               |
| `npm run test`            | Lance les tests !                                              |

## 🚀 CI/CD & Déploiement

### Pipeline automatisé avec GitHub Actions

Ce projet utilise **GitHub Actions** pour automatiser le processus de déploiement :

#### 🔄 Workflow de déploiement

Le pipeline `.github/workflows/deploy.yml` s'exécute automatiquement :

- **Déclenchement** : À chaque push sur la branche `master`
- **Environnement** : Ubuntu Latest avec Node.js 22
- **Étapes** :
  1. ✅ Checkout du code source
  2. ⚙️ Configuration de l'environnement Node.js
  3. 📦 Installation des dépendances (`npm ci`)
  4. 🏗️ Build du projet Astro
  5. 🚀 Déploiement automatique sur GitHub Pages

#### 🛠️ Configuration technique

```yaml
# Déclencheurs
on:
  push:
    branches: [master]
  workflow_dispatch: # Déclenchement manuel

# Permissions
permissions:
  contents: read
  pages: write
  id-token: write
```

#### 🚦 Processus de déploiement

1. **Push sur master** → Déclenche automatiquement le workflow
2. **Build Astro** → Génère les fichiers statiques optimisés
3. **Upload artifact** → Prépare les fichiers pour le déploiement
4. **Deploy to Pages** → Publication sur GitHub Pages

### 📊 Statut du déploiement

- **Temps moyen** : ~2-3 minutes
- **Historique** : Consultable dans l'onglet "Actions" du repository
- **Notifications** : Automatiques en cas d'échec de build

## ✍️ Ajouter un nouvel article

Pour ajouter un nouvel article, il suffit de :

1. Créer un fichier `.md` dans le dossier approprié
2. Ajouter le front matter YAML
3. Rédiger le contenu en Markdown
4. Commit et push → **Le déploiement se fait automatiquement !**

## 📈 Performance

- **Score Lighthouse** : 100/100 (Performance, SEO, Accessibilité)
- **Temps de chargement** : < 1s
- **Taille des bundles** : Optimisée avec tree-shaking automatique
- **Images** : Optimisation automatique via Astro
- **Déploiement** : Automatisé avec GitHub Actions (0 temps d'intervention manuelle)

## 🎨 Personnalisation

### Thème

Les couleurs et styles principaux sont définis dans `src/styles/global.css`. Le site supporte automatiquement les thèmes sombre et clair selon les préférences système.

### Navigation

Modifier la navigation dans `src/components/Header.astro`

### Footer

Personnaliser les informations de contact dans `src/components/Footer.astro`

## 📄 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les suggestions et améliorations sont les bienvenues ! N'hésitez pas à :

- Ouvrir une issue pour signaler un bug
- Proposer une pull request pour une amélioration
- Partager vos idées dans les discussions

**Note** : Chaque pull request déclenche automatiquement les tests via GitHub Actions.

## 📞 Contact

- **Email** : ghalem.maxime@gmail.com
- **LinkedIn** : [Votre profil LinkedIn](https://www.linkedin.com/in/maxime-ghalem/)

---

_Développé avec ❤️, Astro et automatisé avec GitHub Actions_
