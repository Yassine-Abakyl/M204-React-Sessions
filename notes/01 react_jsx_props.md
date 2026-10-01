# Fondations de React (Composants, JSX, CSS et Props)

---
## vite : 
### 1. Qu'est-ce que Vite ?
**Vite** est un outil de développement (un *build tool*) moderne et ultra-rapide. Son rôle est double :
*   Fournir un **serveur de développement local instantané** pendant que vous codez.
*   **Optimiser et packager** vos fichiers (HTML, CSS, JS) pour la mise en ligne (production).

---

### 2. Qu'est-ce que le fichier `package.json` ?
C'est la **carte d'identité de votre projet**. Ce fichier texte contient :
*   Les métadonnées du projet (nom, version, description).
*   Les **scripts** (commandes pour lancer le projet, ex: `npm run dev`).
*   Les **dépendances** : la liste des bibliothèques nécessaires au projet (comme React) avec des versions souvent flexibles (ex: `^18.2.0`).

---

### 3. Qu'est-ce que le fichier `package-lock.json` ?
C'est un **instantané exact et figé** de toutes les dépendances. 
Généré automatiquement par npm, il enregistre l'arbre complet des versions exactes de chaque sous-dépendance installée à un instant T. Il garantit que le projet fonctionnera de la même manière sur tous les ordinateurs.

---

### 4. La différence entre `package.json` et `package-lock.json`

| Critère | `package.json` | `package-lock.json` |
| :--- | :--- | :--- |
| **Rôle** | Spécifie **ce dont** le projet a besoin (général). | Garantit l'**exactitude** et la reproductibilité (détaillé). |
| **Versions** | Utilise des symboles (`^`, `~`) permettant des mises à jour mineures. | Verrouille la version **exacte** (ex: `18.2.0`) sans symbole. |
| **Modification** | Modifié par le **développeur** (installation de packages). | Modifié uniquement par **npm** (interdiction d'y toucher manuellement). |

---

### 5. Le problème résolu par Vite avec React
Le problème majeur résolu par Vite est **la lenteur du flux de développement** (*Slow Feedback Loop*).

*   **Le problème avec l'ancien standard (Webpack / Create React App) :** Avant d'afficher le moindre changement dans le navigateur, Webpack devait analyser et reconstruire (bundler) **l'intégralité** du projet et de ses bibliothèques. Sur un gros projet, modifier une simple couleur prenait plusieurs secondes, voire minutes.
*   **La solution apportée par Vite :** Vite utilise les **modules ES natifs (ESM)** du navigateur. Au lieu de tout reconstruire, le navigateur demande uniquement le fichier que vous venez de modifier. Le rechargement est **instantané (< 1 seconde)**, peu importe la taille de votre application React.

---

## 1. Comment fonctionne React ?

**React fonctionne comme une machine à transformer des données en interface visuelle** en s'appuyant sur un concept clé : le **Virtual DOM** (DOM Virtuel).

Au lieu de manipuler directement la page web (le DOM réel du navigateur, ce qui est lent et coûteux en performances), React procède ainsi :
1. **Création d'une copie virtuelle :** React crée une représentation en mémoire de votre interface (le Virtual DOM).
2. **Détection des changements (Diffing) :** Dès qu'une donnée change (un état ou une prop), React recalcule le nouveau Virtual DOM et le compare avec l'ancien pour identifier précisément ce qui a changé.
3. **Mise à jour ciblée (Reconciliation) :** React applique uniquement les modifications nécessaires sur le vrai navigateur. Si une seule ligne de texte change dans une liste de 1000 éléments, seul ce nœud textuel est reconstruit.

---

## 2. Qu'est-ce qu'un Composant (Component) ?

Un **composant est un bloc de code autonome, réutilisable et indépendant** qui décrit une partie de l'interface utilisateur. C'est l'équivalent d'une brique LEGO. En assemblant plusieurs composants (un bouton, une barre de navigation, une carte produit), vous construisez votre application complète.

En React moderne, un composant est une simple **fonction JavaScript** qui retourne du balisage (du JSX).

```jsx
// ⚠️ RÈGLE : Le nom d'un composant DOIT commencer par une MAJUSCULE
// Sinon, React le confondra avec une balise HTML standard (comme <button>)
function BoutonConnexion() {
  return (
    <button className="btn-main">
      Se connecter
    </button>
  );
}

export default BoutonConnexion;
```

---

## 3. Qu'est-ce que le JSX et toute sa Syntaxe ?

Le **JSX (JavaScript XML)** est une extension de syntaxe pour JavaScript. Il permet d'écrire une structure qui ressemble à du HTML directement au milieu de votre code JavaScript. 

### Les règles strictes de syntaxe du JSX :

* **Un seul élément parent racine :** Un composant ne peut retourner qu'un seul élément global. Si vous avez plusieurs balises sœurs, vous devez les envelopper dans un parent unique ou utiliser un fragment vide (`<> ... </>`).
  ```jsx
  // ❌ INCORRECT (deux parents côte à côte)
  return (
    <h1>Titre</h1>
    <p>Texte</p>
  );

  //  CORRECT (utilisation d'un fragment)
  return (
    <>
      <h1>Titre</h1>
      <p>Texte</p>
    </>
  );
  ```
* **Fermeture obligatoire de toutes les balises :** Même les balises auto-fermantes qui n'ont pas besoin de balise de fermeture en HTML doivent impérativement comporter un slash `/` à la fin.
  ```jsx
  <img src="photo.jpg" alt="Description" />
  <input type="text" />
  <br />
  ```
* **Attributs en camelCase :** Le JSX est plus proche du JavaScript que du HTML. Les attributs HTML classiques se transforment en camelCase.
  * `class` devient **`className`**
  * `onclick` devient **`onClick`**
  * `tabindex` devient **`tabIndex`**

---

## 4. Comment écrire du JavaScript dans le JSX ?

Pour insérer du code JavaScript dynamique (variables, expressions mathématiques, fonctions, conditions) dans votre structure JSX, vous devez utiliser les **accolades `{}`**. Les accolades agissent comme une passerelle qui bascule du monde HTML/JSX vers le monde JavaScript.

### Exemples d'insertion JavaScript :

```jsx
function ProfilUtilisateur() {
  const prenom = "Alice";
  const age = 26;
  const estEnLigne = true;

  return (
    <div>
      {/* 1. Afficher une variable textuelle ou numérique */}
      <h1>Bonjour, {prenom} !</h1>
      <p>L'année prochaine, vous aurez {age + 1} ans.</p>

      {/* 2. Évaluer une expression conditionnelle (Opérateur ternaire) */}
      <p>Statut : {estEnLigne ? "🟢 Actif" : "🔴 Hors ligne"}</p>

      {/* 3. Utiliser du JavaScript sur les attributs */}
      <img src={`https://api.avatar.com/${prenom}.png`} alt={prenom} />
    </div>
  );
}
```

---

## 5. Comment écrire du CSS dans le JSX ?

Il existe trois techniques majeures pour intégrer du style en React.

### Technique 1 : Le style en ligne (Inline Styles)
On passe un **objet JavaScript** à l'attribut `style`. Les propriétés CSS s'écrivent en `camelCase` et les valeurs sont des chaînes de caractères.
*Pourquoi y a-t-il deux paires d'accolades `{{ }}` ?* La première paire ouvre l'évaluation JavaScript, la seconde déclare l'objet de style.

```jsx
function Alerte() {
  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '15px', borderRadius: '5px' }}>
      Une erreur est survenue !
    </div>
  );
}
```

### Technique 2 : Les classes CSS classiques (Fichier externe)
Vous liez un fichier CSS standard en l'important en haut de votre composant. Vous appliquez ensuite vos styles avec l'attribut `className`.

```css
/* style.css */
.card-profile {
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
}
```

```jsx
// Composant.jsx
import './style.css'; // Importation globale du style

function Carte() {
  return <div className="card-profile">Contenu de la carte</div>;
}
```

### Technique 3 : Le CSS dynamique selon une variable
Vous pouvez utiliser les accolades `{}` et les template literals (backticks \`\`) pour changer de classe ou de style selon une condition JavaScript.

```jsx
function BoutonDynamique({ estActif }) {
  return (
    <button className={`btn-base ${estActif ? 'active-style' : 'disabled-style'}`}>
      Cliquez ici
    </button>
  );
}
```

---

## 6. Qu'est-ce que les Props ? (Définition & Exemples)

Les **props (propriétés)** sont un objet spécial contenant les données qu'un **composant parent transmet à son composant enfant**. Elles permettent de configurer et de rendre un composant réutilisable avec des données différentes.
*⚠️ Règle stricte : Les props sont en **lecture seule** (read-only). Un composant enfant ne doit jamais modifier ses props directement.*

Voici les deux manières principales de récupérer les props dans le composant enfant : via l'objet entier, ou via la déstructuration (méthode recommandée).

### Approche A : En utilisant l'objet entier (`props`)
Le composant reçoit un argument global nommé `props`. Pour accéder aux valeurs, on écrit `props.nomPropriete`.

```jsx
// 1. LE COMPOSANT ENFANT (Reçoit l'objet global)
function CarteProduitComplet(props) {
  return (
    <div className="product-card">
      <h2>{props.titre}</h2>
      <p>Prix : {props.prix} €</p>
    </div>
  );
}

// 2. LE COMPOSANT PARENT (Envoie les attributs)
function Boutique() {
  return (
    <div>
      <CarteProduitComplet titre="Ordinateur Portable" prix={999} />
      <CarteProduitComplet titre="Souris Sans Fil" prix={45} />
    </div>
  );
}
```

### Approche B : En utilisant la déstructuration (Destructuring)
Plutôt que de répéter le mot `props` partout, on extrait directement les variables entre accolades `{}` au moment de déclarer les paramètres de la fonction. C'est la syntaxe moderne la plus propre et la plus lue.

```jsx
// 1. LE COMPOSANT ENFANT (Déstructuration directe dans les arguments)
function CarteUtilisateur({ nom, role, age }) {
  return (
    <div className="user-card">
      <h3>Nom complet : {nom}</h3>
      <p>Poste : {role}</p>
      <p>Âge : {age} ans</p>
    </div>
  );
}

// 2. LE COMPOSANT PARENT
function Equipe() {
  return (
    <section>
      <h1>Membres de l'équipe</h1>
      {/* Passage des données textuelles avec "" et numériques avec {} */}
      <CarteUtilisateur nom="Thomas" role="Développeur Web" age={31} />
      <CarteUtilisateur nom="Julia" role="Chef de projet" age={27} />
    </section>
  );
}
```
