# Guide Complet React : Map, Events, State & Hooks

Ce document explique en détail les concepts fondamentaux de React nécessaires pour comprendre et structurer vos composants de manière efficace.

---

## 1. Boucler sur un Composant : Le Rendu de Listes (Map & la Prop `key`)

En React, pour afficher une liste de données ou de composants dynamiquement, on utilise la méthode JavaScript `.map()`. Cette méthode transforme un tableau de données en un tableau d'éléments React (JSX).

### Pourquoi et où utilise-t-il la prop `key` ?

*   **Où l'utiliser ?** La prop `key` doit obligatoirement être placée sur l'élément situé **au plus haut niveau (le composant parent direct)** à l'intérieur de la fonction de rappel (callback) du `.map()`.
*   **Pourquoi l'utiliser (Le problème résolu) ?** 
    React utilise un "Virtual DOM" pour optimiser les performances. Lorsqu'une liste change (ajout, suppression, modification d'un élément), React a besoin d'un identifiant unique pour comparer l'ancienne liste et la nouvelle (processus de *Reconciliation*).
    Sans la prop `key`, React devrait recréer et réafficher toute la liste à chaque changement. Grâce à la `key`, il sait exactement quel élément a été modifié, ajouté ou supprimé, ce qui évite des re-rendus inutiles et préserve l'état local (comme le texte saisi dans un input).

### Exemple de Syntaxe :
```jsx
const UserList = () => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ];

  return (
    <ul>
      {users.map((user) => (
        // La clé 'key' est placée sur l'élément racine retourné par map (ici le <li>)
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};
```
*Note importante : Évitez d'utiliser l'index du tableau (`index`) comme clé si la liste peut être triée, filtrée ou modifiée, car cela peut causer des bugs d'affichage.*

---

## 2. Les Événements dans React (Event Handling)

La gestion des événements en React ressemble beaucoup à celle du HTML classique (DOM), mais elle possède des spécificités importantes en termes de syntaxe et de fonctionnement.

### Syntaxe et Spécificités
1.  **Le CamelCase :** Contrairement au HTML standard (`onclick`, `onchange`), React utilise le format camelCase (`onClick`, `onChange`, `onSubmit`).
2.  **Passage de Fonctions :** En HTML, on passe une chaîne de caractères (`onclick="handleClick()"`). En React, on passe la **référence de la fonction** directement entre accolades (`onClick={handleClick}`). *Attention : ne mettez pas de parenthèses `()` à la fonction, sinon elle s'exécutera immédiatement pendant le rendu au lieu de s'exécuter au moment du clic.*
3.  **SyntheticEvent (Événements Synthétiques) :** React n'utilise pas directement les événements natifs du navigateur. Il enveloppe les événements natifs dans un objet appelé `SyntheticEvent`. Cela garantit que les événements fonctionnent exactement de la même manière sur tous les navigateurs (Chrome, Safari, Firefox, etc.).

### Exemples Pratiques de Syntaxe :

#### Événement Simple (Sans Argument) :
```jsx
function ButtonClick() {
  const handleClick = () => {
    alert("Bouton cliqué !");
  };

  return <button onClick={handleClick}>Cliquez ici</button>;
}
```

#### Événement avec Passage de Paramètres :
Si vous devez envoyer une donnée spécifique lors du clic, vous devez encapsuler la fonction dans une fonction fléchée anonyme :
```jsx
function ProductList() {
  const deleteProduct = (id) => {
    console.log(`Produit ${id} supprimé`);
  };

  return (
    <button onClick={() => deleteProduct(42)}>
      Supprimer le produit 42
    </button>
  );
}
```
---

## 3. L'État (State) et les Hooks : Définitions et Concepts

### C'est quoi un Hook ?
Un **Hook** (littéralement "crochet") est une fonction JavaScript spéciale introduite dans React 16.8. Les Hooks permettent d'utiliser les fonctionnalités avancées de React (comme l'état ou le cycle de vie) à l'intérieur de **composants fonctionnels**, sans avoir à écrire des composants sous forme de classes. Tous les Hooks commencent par le préfixe `use` (ex: `useState`, `useEffect`).

### C'est quoi le State (L'État) ?
Le **State** est la mémoire locale d'un composant. C'est un objet ou une valeur JavaScript interne à un composant qui peut changer au fil du temps en fonction des interactions de l'utilisateur (clics, saisie de texte) ou de réponses réseau (appels API). 

### Quel problème l'État et les Hooks résolvent-ils ?
1.  **Le Problème des Variables Classiques :** Si vous utilisez une variable JavaScript standard dans un composant (ex: `let counter = 0;`), modifier cette variable ne force pas React à réafficher le composant à l'écran. L'interface utilisateur reste figée. Le **State** résout cela : chaque fois qu'un état est modifié, React déclenche automatiquement un re-rendu du composant pour mettre à jour l'affichage.
2.  **Le Problème des Composants Classes :** Avant les Hooks, pour avoir un état, il fallait obligatoirement créer des classes complexes avec `this`, un `constructor` et lier (`bind`) les méthodes. Les **Hooks** permettent de garder des composants sous forme de fonctions simples, lisibles et faciles à réutiliser, tout en bénéficiant de la puissance d'un état.

---

## 4. Le Hook `useState` en Détail

Le Hook `useState` est le plus fondamental de React. Il permet d'ajouter un état local à un composant fonctionnel.

### Quel problème résout-il ?
Il permet de stocker, de lire et de mettre à jour de manière dynamique une information spécifique à un composant, tout en assurant que l'interface graphique (UI) reste synchronisée en temps réel avec cette information.

### Syntaxe Complète :
```jsx
const [state, setState] = useState(initialValue);
```

### Explication pas à pas de chaque élément de la syntaxe :

1.  **`useState(initialValue)` :** C'est l'appel de la fonction Hook. On lui passe en paramètre `initialValue` (la valeur initiale). Cela peut être un nombre, une chaîne de caractères, un booléen, un tableau ou un objet. Au tout premier chargement du composant, l'état prendra cette valeur.
2.  **`[ ... ]` (Destructuring de Tableau) :** La fonction `useState` retourne toujours un tableau contenant exactement deux éléments. Pour récupérer ces éléments proprement, on utilise la décomposition (destructuring) de tableau en JavaScript.
3.  **`state` (Le premier élément) :** C'est la variable qui contient la **valeur actuelle** de votre état. Vous pouvez l'utiliser directement dans votre JSX (ex: `{state}`) pour l'afficher. Elle est en lecture seule (read-only), on ne doit jamais la modifier directement (pas de `state = 5`).
4.  **`setState` (Le deuxième élément) :** C'est la **fonction de mise à jour**. On l'appelle en lui passant la nouvelle valeur que l'on veut attribuer à l'état (ex: `setState(5)`). Lorsque cette fonction est appelée :
    *   Elle remplace l'ancienne valeur par la nouvelle.
    *   Elle prévient React qu'un changement a eu lieu.
    *   React relance immédiatement la fonction du composant pour mettre à jour l'écran de l'utilisateur.

### Exemple Pratique : Le Compteur
Voici comment tous ces éléments s'assemblent dans un code réel :

```jsx
import React, { useState } from 'react';

function Counter() {
  // Déclaration de l'état 'count' initialisé à 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      
      {/* On utilise setCount pour modifier la valeur au clic */}
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}

export default Counter;
```

---
