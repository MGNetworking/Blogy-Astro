# Système de Tags - Documentation

## Vue d'ensemble

Le système de tags permet d'associer des couleurs cohérentes aux technologies dans l'application. Il est centralisé dans `utils/tagService.js`.

## Structure des couleurs

### 🔵 Performance & Monitoring (`tech-blue`)

- performance

### 🟢 Frameworks Frontend (`tech-green`)

- astro
- react
- vue
- angular
- web

### 🟡 Langages Script/Dynamiques (`tech-yellow`)

- typescript
- javascript
- shell
- groovy

### 🔴 Langages Web de Base (`tech-red`)

- html
- css
- markdown

### 🟣 Langages Backend/Compilés (`tech-purple`)

- java
- c#
- spring
- .net
- nodejs

### 🟠 DevOps & Infrastructure (`tech-orange`)

- docker
- docker swarm
- kubernetes
- jenkins
- nginx
- github actions

### ⚫ Systèmes & OS (`tech-gray`)

- ubuntu
- linux
- esxi

### 🔷 Outils & Plateformes (`tech-cyan`)

- github
- keycloak

### 🟩 Testing & Quality (`tech-teal`)

- jest
- junit
- testng
- playwright
- cypress
- selenium
- puppeteer

## Classes CSS disponibles

```css
tech-blue    /* Bleu - Performance & Monitoring */
tech-green   /* Vert - Frameworks Frontend */
tech-yellow  /* Jaune - Langages Script/Dynamiques */
tech-red     /* Rouge - Langages Web de Base */
tech-purple  /* Violet - Langages Backend/Compilés */
tech-orange  /* Orange - DevOps & Infrastructure */
tech-gray    /* Gris - Systèmes & OS */
tech-cyan    /* Cyan - Outils & Plateformes */
tech-teal   /* Teal - Testing & Quality */
```

## Utilisation

### Dans les templates

```html
<div class="flex flex-wrap gap-2 mb-4">
  {article.tags.map((tag) => (
  <span class="{getTagClass(tag)}">{tag}</span>
  ))}
</div>
```

### Fonctions principales

- `getTagClass(tag)` - Retourne la classe CSS pour un tag
- `extractUniqueTagsFromArticles(articles)` - Extrait tous les tags uniques
- `filterArticlesByTag(articles, selectedTag)` - Filtre par tag
- `getAllTagClasses()` - Liste toutes les classes disponibles

## Base de données

### Structure recommandée pour export BD

```sql
-- Table des catégories de technologies
CREATE TABLE tech_categories (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color_class VARCHAR(20) NOT NULL,
  icon_emoji VARCHAR(10),
  description TEXT
);

-- Table des technologies
CREATE TABLE technologies (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  category_id INT,
  aliases JSON, -- ["vue", "vuejs"]
  FOREIGN KEY (category_id) REFERENCES tech_categories(id)
);

-- Table de liaison articles-technologies
CREATE TABLE article_technologies (
  article_id INT,
  technology_id INT,
  PRIMARY KEY (article_id, technology_id)
);
```

### Données d'exemple

```sql
-- Catégories
INSERT INTO tech_categories VALUES
(1, 'Performance & Monitoring', 'tech-blue', '🔵', 'Outils de performance'),
(2, 'Frameworks Frontend', 'tech-green', '🟢', 'Frameworks côté client'),
(3, 'Langages Script', 'tech-yellow', '🟡', 'Langages de script'),
(4, 'Web de Base', 'tech-red', '🔴', 'Technologies web fondamentales'),
(5, 'Backend/Runtime', 'tech-purple', '🟣', 'Technologies serveur'),
(6, 'DevOps', 'tech-orange', '🟠', 'Infrastructure et déploiement'),
(7, 'Systèmes', 'tech-gray', '⚫', 'OS et systèmes'),
(8, 'Outils', 'tech-cyan', '🔷', 'Outils et plateformes');

-- Technologies
INSERT INTO technologies VALUES
(1, 'react', 2, '["react"]'),
(2, 'vue', 2, '["vue", "vuejs"]'),
(3, 'nodejs', 5, '["nodejs", "node.js"]'),
(4, 'docker', 6, '["docker"]');
```

## Migration depuis le fichier actuel

```javascript
// Script de migration pour exporter vers BD
function exportToDatabase() {
  const categories = [
    { name: "Performance & Monitoring", class: "tech-blue", emoji: "🔵" },
    { name: "Frameworks Frontend", class: "tech-green", emoji: "🟢" },
    // ... autres catégories
  ];

  const technologies = Object.entries(TAG_CLASSES).map(([name, className]) => ({
    name,
    category: getCategoryByClass(className),
    aliases: getAliases(name),
  }));

  return { categories, technologies };
}
```

## Notes

- **Défaut** : `tech-gray` pour les tags non définis
- **Sensibilité** : Les comparaisons sont insensibles à la casse
- **Extensibilité** : Fonction `addTagClass()` pour ajouter de nouveaux tags
- **Cohérence** : Un seul fichier à maintenir pour toute l'application
