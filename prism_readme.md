# Guide Configuration Prism.js avec Astro

Ce guide explique comment configurer Prism.js pour la coloration syntaxique dans un projet Astro avec des couleurs GitHub Dark exactes.

## 📋 Table des matières

- [Configuration de base](#configuration-de-base)
- [Langages supportés](#langages-supportés)
- [Ajout de nouveaux langages](#ajout-de-nouveaux-langages)
- [Couleurs GitHub Dark](#couleurs-github-dark)
- [Ressources utiles](#ressources-utiles)

## 🚀 Configuration de base

### Layout.astro

```astro
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    
    <!-- CSS Prism Theme -->
    <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.css" rel="stylesheet" />
  </head>

  <body>
    <Navbar />
    <main><slot /></main>
    <Footer />

    <!-- Prism Core + Autoloader -->
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-autoloader.min.js"></script>
    
    <!-- Alias pour langages courts (optionnel) -->
    <script>
      window.addEventListener('load', () => {
        if (window.Prism) {
          Prism.languages.ts = Prism.languages.typescript;
          Prism.languages.js = Prism.languages.javascript;
          Prism.languages.py = Prism.languages.python;
          Prism.languages.yml = Prism.languages.yaml;
        }
      });
    </script>
  </body>
</html>
```

## 🎨 Couleurs GitHub Dark

### CSS de base

Ajoutez dans votre fichier CSS (classe `.prose`) :

```css
.prose {
  /* Blocs de code */
  pre[class*="language-"] {
    background-color: #0d1117 !important; /* GitHub Dark background */
    border: 1px solid #30363d;
  }

  /* === COULEURS GITHUB DARK EXACTES === */
  
  /* Mots-clés (const, let, function, class, if, return, etc.) */
  .token.keyword {
    color: #ff7b72; /* Rouge GitHub exact */
  }

  /* Chaînes de caractères */
  .token.string {
    color: #a5d6ff; /* Bleu clair GitHub exact */
  }

  /* Commentaires */
  .token.comment {
    color: #8b949e; /* Gris GitHub exact */
    font-style: italic;
  }

  /* Fonctions et méthodes */
  .token.function {
    color: #d2a8ff; /* Violet GitHub exact */
  }

  /* Propriétés CSS et JSON */
  .token.property {
    color: #79c0ff; /* Bleu GitHub exact */
  }

  /* Variables */
  .token.variable {
    color: #ffa657; /* Orange GitHub exact */
  }

  /* Nombres */
  .token.number {
    color: #79c0ff; /* Bleu GitHub exact */
  }

  /* Booléens */
  .token.boolean {
    color: #79c0ff; /* Bleu GitHub exact */
  }

  /* null, undefined */
  .token.null,
  .token.undefined {
    color: #ff7b72; /* Rouge GitHub exact */
  }

  /* Opérateurs et ponctuation */
  .token.operator,
  .token.punctuation {
    color: #c9d1d9; /* Blanc GitHub exact */
  }
}
```

## 📝 Langages supportés

### Langages Web
```markdown
```javascript
```typescript  
```css
```html
```json
```jsx
```tsx
```

### Langages de programmation
```markdown
```python
```java
```csharp
```cpp
```go
```rust
```php
```ruby
```kotlin
```swift
```scala
```

### Configuration et markup
```markdown
```yaml
```toml
```ini
```dockerfile
```nginx
```markdown
```xml
```

### Shell et scripts
```markdown
```bash
```powershell
```batch
```shell-session
```

### Base de données
```markdown
```sql
```mongodb
```

### Autres
```markdown
```git
```diff
```regex
```

## ✨ Ajout de nouveaux langages

### Avec l'autoloader (automatique)

1. **Écrivez simplement dans votre Markdown :**
   ````markdown
   ```rust
   fn main() {
       println!("Hello, world!");
   }
   ```
   ````

2. **Prism charge automatiquement `prism-rust.js`**

3. **Ajoutez les couleurs CSS (optionnel) :**
   ```css
   .language-rust .token.keyword {
     color: #ff7b72;
   }
   .language-rust .token.string {
     color: #a5d6ff;
   }
   ```

### Couleurs spécifiques par langage

```css
/* Java */
.language-java .token.annotation {
  color: #d2a8ff; /* Violet pour @Override, @Entity, etc. */
}

/* YAML */
.language-yaml .token.key {
  color: #79c0ff; /* Bleu pour les clés */
}

/* Python */
.language-python .token.decorator {
  color: #ffa657; /* Orange pour @decorator */
}

/* CSS */
.language-css .token.selector {
  color: #7ee787; /* Vert pour les sélecteurs */
}
```

## 🔍 Ressources utiles

### Documentation officielle
- [Prism.js Documentation](https://prismjs.com/)
- [Langages supportés](https://prismjs.com/#supported-languages)
- [Repository GitHub](https://github.com/PrismJS/prism)

### Liste des composants
- [Composants Prism](https://github.com/PrismJS/prism/tree/master/components)

### Tester un langage
```javascript
// Dans la console du navigateur
console.log("Langages chargés:", Object.keys(Prism.languages));

// Tester si un langage existe
fetch('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-LANGAGE.min.js')
  .then(r => console.log('Existe:', r.ok))
```

### Pattern des noms
```
Markdown: language-python → Script: prism-python.js
Markdown: language-rust   → Script: prism-rust.js  
Markdown: language-go     → Script: prism-go.js
```

## 🎯 Couleurs GitHub complètes

### Palette de couleurs GitHub Dark

| Couleur | Hex Code | Usage |
|---------|----------|--------|
| 🔴 Rouge | `#ff7b72` | Mots-clés, null |
| 🔵 Bleu | `#79c0ff` | Propriétés, nombres |
| 💙 Bleu clair | `#a5d6ff` | Chaînes de caractères |
| 🟢 Vert | `#7ee787` | Sélecteurs CSS, regex |
| 🟠 Orange | `#ffa657` | Variables, classes |
| 🟣 Violet | `#d2a8ff` | Fonctions, annotations |
| ⚪ Blanc | `#c9d1d9` | Ponctuation, opérateurs |
| 🔘 Gris | `#8b949e` | Commentaires |

## 🚀 Avantages de cette configuration

✅ **Automatique** : L'autoloader charge les langages à la demande  
✅ **Performant** : Seuls les langages utilisés sont téléchargés  
✅ **Évolutif** : Nouveaux langages sans modification de code  
✅ **Cohérent** : Couleurs GitHub Dark exactes  
✅ **Maintenir** : Configuration centralisée  

## 💡 Tips

- **Alias** : Créez des raccourcis (`ts` → `typescript`)
- **Cache** : Les scripts sont mis en cache par le navigateur
- **Debug** : Utilisez `console.log(Prism.languages)` pour diagnostiquer
- **Fallback** : Prism fonctionne même si un langage n'existe pas

---

**Configuration testée avec Astro + Prism.js 1.29.0** ✨