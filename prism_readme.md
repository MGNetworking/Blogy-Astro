# Guide Configuration Prism.js avec Astro

Ce guide explique comment configurer Prism.js pour la coloration syntaxique dans un projet Astro en utilisant les CDN pour une approche simple et performante.

## Table des matières

- [Configuration de base](#configuration-de-base)
- [Couleurs GitHub Dark](#couleurs-github-dark)
- [Langages configurés dans ce projet](#langages-configurés-dans-ce-projet)
- [Ajout de nouveaux langages](#ajout-de-nouveaux-langages)
- [Configuration avancée](#configuration-avancée)
- [Ressources utiles](#ressources-utiles)
- [Palette de couleurs GitHub Dark](#palette-de-couleurs-github-dark)
- [Avantages de cette configuration](#avantages-de-cette-configuration)
- [Conseils](#conseils)

## Configuration de base

### Layout.astro - Approche CDN (Recommandée)

```astro
---
import Navbar from "../shared/Navbar.astro";
import Footer from "../shared/Footer.astro";
import "../../@tailwind.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Site par défaut" } = Astro.props as Props;
---

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- CSS Prism via CDN -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-tomorrow.min.css"
      rel="stylesheet"
    />

    <title>{title}</title>
    <meta name="description" content={description} />
  </head>

  <body>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />

    <!-- Scripts Prism via CDN -->
    <!-- Core Prism -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/prism.min.js"
      integrity="sha512-HiD3V4nv8fcjtouznjT9TqDNDm1EXngV331YGbfVGeKUoH+OLkRTCMzA34ecjlgSQZpdHZupdSrqHY+Hz3l6uQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <!-- Langages de base -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-css.min.js"
      integrity="sha512-uMdVuOpm+9lNPCT7mV/YaMb9YQ/R4+eeON7aEMj6Ig/f4BoU+Q5k6iaZkDsX7LH9cjTHZt0CuKxbzd0/fndrWA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-javascript.min.js"
      integrity="sha512-jwrwRWZWW9J6bjmBOJxPcbRvEBSQeY4Ad0NEXSfP0vwYi/Yu9x5VhDBl3wz6Pnxs8Rx/t1P8r9/OHCRciHcT7Q=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-typescript.min.js"
      integrity="sha512-uOw7XYETzS/DPmmirpP5UCMihSDNMeyTS965J0/456OSPfxn9xEtHHjj5Q/5WefVdqyMfN/afmQnNpZd/tpkcA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-yaml.min.js"
      integrity="sha512-6O/PZimM3TD1NN3yrazePA4AbZrPcwt1QCGJrVY7WoHDJROZFc9TlBvIKMe+QfqgcslW4lQeBzNJEJvIMC8WhA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-java.min.js"
      integrity="sha512-xKcnbsdT0KMoA4yrozkqZM1XJVTrPsjdQwvigxlAlxEDu8YDvC/jl+LfVqn0fY3Vs6m2y4a89JCHEIA/Z9zpmQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-bash.min.js"
      integrity="sha512-whYhDwtTmlC/NpZlCr6PSsAaLOrfjVg/iXAnC4H/dtiHawpShhT2SlIMbpIhT/IL/NrpdMm+Hq2C13+VKpHTYw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
    </script>

    <!-- Configuration des alias -->
    <script is:inline>
      document.addEventListener("DOMContentLoaded", function () {
        if (window.Prism) {
          Prism.languages.ts = Prism.languages.typescript;
          Prism.languages.js = Prism.languages.javascript;
          Prism.highlightAll();
        }
      });
    </script>
  </body>
</html>
```

## Couleurs GitHub Dark

### CSS de base

Ajoutez dans votre fichier CSS (classe `.prose`) :

```css
.prose {
  /* Blocs de code */
  pre[class*="language-"] {
    background-color: #0d1117 !important; /* GitHub Dark background */
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;
  }

  /* Code inline */
  code[class*="language-"] {
    background-color: #0d1117 !important;
    color: #c9d1d9;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.875em;
  }

  /* === COULEURS GITHUB DARK EXACTES === */

  /* Mots-clés (const, let, function, class, if, return, etc.) */
  .token.keyword {
    color: #ff7b72 !important; /* Rouge GitHub exact */
    font-weight: normal;
  }

  /* Chaînes de caractères */
  .token.string {
    color: #a5d6ff !important; /* Bleu clair GitHub exact */
  }

  /* Commentaires */
  .token.comment {
    color: #8b949e !important; /* Gris GitHub exact */
    font-style: italic;
  }

  /* Fonctions et méthodes */
  .token.function {
    color: #d2a8ff !important; /* Violet GitHub exact */
  }

  /* Propriétés CSS et JSON */
  .token.property {
    color: #79c0ff !important; /* Bleu GitHub exact */
  }

  /* Variables */
  .token.variable {
    color: #ffa657 !important; /* Orange GitHub exact */
  }

  /* Nombres */
  .token.number {
    color: #79c0ff !important; /* Bleu GitHub exact */
  }

  /* Booléens */
  .token.boolean {
    color: #79c0ff !important; /* Bleu GitHub exact */
  }

  /* null, undefined */
  .token.null,
  .token.undefined {
    color: #ff7b72 !important; /* Rouge GitHub exact */
  }

  /* Opérateurs et ponctuation */
  .token.operator,
  .token.punctuation {
    color: #c9d1d9 !important; /* Blanc GitHub exact */
  }

  /* Classes et types */
  .token.class-name {
    color: #ffa657 !important; /* Orange GitHub exact */
  }

  /* Attributs HTML */
  .token.attr-name {
    color: #79c0ff !important; /* Bleu GitHub exact */
  }

  /* Valeurs d'attributs HTML */
  .token.attr-value {
    color: #a5d6ff !important; /* Bleu clair GitHub exact */
  }

  /* Tags HTML */
  .token.tag {
    color: #7ee787 !important; /* Vert GitHub exact */
  }

  /* Sélecteurs CSS */
  .token.selector {
    color: #7ee787 !important; /* Vert GitHub exact */
  }
}
```

## Langages configurés dans ce projet

### Langages Web (Inclus par défaut)

`````markdown
````css - Feuilles de style
```javascript - JavaScript
```typescript - TypeScript
````
`````

`````

### Configuration et Scripts

````markdown
````yaml - Fichiers YAML
```java      - Langage Java
```bash      - Scripts Bash/Shell
`````

## Ajout de nouveaux langages

### Étape 1: Trouver le composant sur cdnjs

Visitez : [https://cdnjs.com/libraries/prism/1.30.0](https://cdnjs.com/libraries/prism/1.30.0)

Recherchez le composant souhaité, par exemple :

- `prism-python.min.js` pour Python
- `prism-php.min.js` pour PHP
- `prism-rust.min.js` pour Rust
- `prism-go.min.js` pour Go

### Étape 2: Ajouter le script dans Layout.astro

```astro
<!-- Exemple pour Python -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-python.min.js"
  integrity="SHA512_À_COPIER_DEPUIS_CDNJS"
  crossorigin="anonymous"
  referrerpolicy="no-referrer">
</script>
```

### Étape 3: Utiliser dans votre Markdown

````markdown
```python
def hello_world():
    print("Hello, World!")
    return True
```
````

### Langages populaires disponibles

`````markdown
# Langages de programmation

````python - Python
```php         - PHP
```rust        - Rust
```go          - Go
```cpp         - C++
```csharp      - C#
```kotlin      - Kotlin
```swift       - Swift
```ruby        - Ruby

# Base de données
```sql         - SQL
```mongodb     - MongoDB

# Configuration
```json        - JSON
```toml        - TOML
```ini         - INI
```dockerfile  - Dockerfile
```nginx       - Configuration Nginx

# Markup
```html        - HTML
```xml         - XML
```markdown    - Markdown

# Shell
```powershell  - PowerShell
```batch       - Batch Windows

# Autres
```regex       - Expressions régulières
```git         - Git
```diff        - Différences
````
`````

```

```

## Configuration avancée

### Alias personnalisés

Ajoutez des raccourcis dans votre script de configuration :

```javascript
document.addEventListener("DOMContentLoaded", function () {
  if (window.Prism) {
    // Alias existants
    Prism.languages.ts = Prism.languages.typescript;
    Prism.languages.js = Prism.languages.javascript;

    // Nouveaux alias
    Prism.languages.py = Prism.languages.python;
    Prism.languages.yml = Prism.languages.yaml;
    Prism.languages.sh = Prism.languages.bash;

    Prism.highlightAll();
  }
});
```

### Couleurs spécifiques par langage

```css
/* Python */
.language-python .token.decorator {
  color: #ffa657 !important; /* Orange pour @decorator */
}

/* YAML */
.language-yaml .token.key {
  color: #79c0ff !important; /* Bleu pour les clés */
}

/* Java */
.language-java .token.annotation {
  color: #d2a8ff !important; /* Violet pour @Override, @Entity */
}

/* CSS */
.language-css .token.important {
  color: #ff7b72 !important; /* Rouge pour !important */
}
```

## Ressources utiles

### Documentation et outils

- [Site officiel Prism.js](https://prismjs.com/)
- [CDN cdnjs - Prism 1.30.0](https://cdnjs.com/libraries/prism/1.30.0)
- [Guide d'utilisation CDN](https://prismjs.com/#basic-usage-cdn)
- [Langages supportés](https://prismjs.com/#supported-languages)

### Debug et test

```javascript
// Dans la console du navigateur
console.log("Langages chargés:", Object.keys(Prism.languages));

// Vérifier si Prism est chargé
console.log("Prism disponible:", !!window.Prism);

// Forcer le highlighting
Prism.highlightAll();
```

### Thèmes disponibles

Remplacez le thème dans le `<link>` :

```html
<!-- Thème sombre (recommandé) -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-tomorrow.min.css"
  rel="stylesheet"
/>

<!-- Autres thèmes -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-dark.min.css"
  rel="stylesheet"
/>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-okaidia.min.css"
  rel="stylesheet"
/>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/themes/prism-twilight.min.css"
  rel="stylesheet"
/>
```

## Palette de couleurs GitHub Dark

| Couleur       | Hex Code  | Usage                         |
| ------------- | --------- | ----------------------------- |
| 🔴 Rouge      | `#ff7b72` | Mots-clés, null, undefined    |
| 🔵 Bleu       | `#79c0ff` | Propriétés, nombres, booléens |
| 💙 Bleu clair | `#a5d6ff` | Chaînes de caractères         |
| 🟢 Vert       | `#7ee787` | Tags HTML, sélecteurs CSS     |
| 🟠 Orange     | `#ffa657` | Variables, classes, types     |
| 🟣 Violet     | `#d2a8ff` | Fonctions, méthodes           |
| ⚪ Blanc      | `#c9d1d9` | Ponctuation, opérateurs       |
| 🔘 Gris       | `#8b949e` | Commentaires                  |
| 🖤 Fond       | `#0d1117` | Arrière-plan des blocs        |

## Avantages de cette configuration

✅ **Simple** : Pas de dépendances npm à gérer  
✅ **Performant** : CDN optimisé avec cache navigateur  
✅ **Sécurisé** : Intégrité des fichiers vérifiée  
✅ **Maintenir** : Mise à jour facile des versions  
✅ **Compatible** : Fonctionne avec le build statique Astro  
✅ **Flexible** : Ajout de langages sans rebuild

## Conseils

- **Chargement** : Les scripts sont chargés de manière séquentielle
- **Cache** : Le navigateur met en cache les fichiers CDN
- **Integrity** : Les hashes SHA garantissent l'intégrité des fichiers
- **Fallback** : Prism fonctionne même si un langage manque
- **Debug** : Utilisez la console pour diagnostiquer les problèmes

---

**Configuration testée avec Astro 4.x + Prism.js 1.30.0** ✨
