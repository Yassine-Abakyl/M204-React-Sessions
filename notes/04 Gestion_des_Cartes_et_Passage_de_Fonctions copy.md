# Gestion des Cartes et Passage de Fonctions
---

## 1. Passer des fonctions à un composant (Props)

### Définitions
*   **Props (Properties) :** En React, les *props* sont des arguments passés aux composants React. Ils sont transmis du composant parent au composant enfant via les attributs HTML et sont en lecture seule.
*   **Callback Function (Fonction de rappel) :** Une fonction passée en argument à une autre fonction ou à un composant, destinée à être exécutée plus tard en réponse à un événement spécifique.

### Explication détaillée
En React, les données circulent de manière unidirectionnelle (du haut vers le bas). Cependant, un composant enfant a souvent besoin de communiquer avec son parent (par exemple, pour lui signaler qu'un utilisateur a cliqué sur un bouton). 

Pour réaliser cette communication ascendante, le composant parent transmet une **fonction** en tant que *prop* au composant enfant. Lorsque l'événement se produit dans l'enfant, la fonction est exécutée, ce qui permet de modifier l'état (*state*) resté dans le parent.

#### Exemple conceptuel
```jsx
// Composant Parent
function Parent() {
  const alerteParent = () => {
    alert("Action déclenchée depuis l'enfant !");
  };

  return <Enfant onClickBouton={alerteParent} />;
}

// Composant Enfant
function Enfant({ onClickBouton }) {
  return <button onClick={onClickBouton}>Cliquez ici</button>;
}
```

---

## 2. Implémentation de "Delete" et "Edit" dans une Carte

Dans une application de type Liste (comme une liste de tâches, de etudiants ou d'utilisateurs), chaque élément est souvent représenté par une **Carte** (`Card`). Les actions de suppression et de modification doivent impacter la liste principale stockée dans le composant Parent.

1.  **Gestion de l'état global (Parent) :** Le parent possède le tableau d'objets (les cartes) et expose deux fonctions : `handleDelete(id)` et `handleEdit(newData)`.
2.  **Passage des fonctions (Props) :** Lors du rendu de la liste, le parent passe ces fonctions à chaque composant `Card`, en y associant parfois directement l'identifiant unique (`id`) de l'élément.
3.  **Déclenchement (Enfant) :** Le composant `Card` affiche les boutons "Modifier" et "Supprimer" et lie leurs événements `onClick` aux fonctions reçues en props.

---

## 3. Résumé des bonnes pratiques

*   **Clés uniques (`key`) :** Utilisez toujours une prop `key` unique (comme `card.id`) lorsque vous affichez une liste de composants pour aider React à optimiser le rendu visuel.

*   **Fonctions fléchées anonymes :** Dans le composant enfant, si vous devez passer un argument à la fonction prop (comme `item.id`), utilisez une fonction fléchée : `onClick={() => onDelete(item.id)}`. Cela évite que la fonction ne s'exécute immédiatement lors du rendu initial.

*   **Immuabilité :** Ne modifiez jamais directement le tableau `cards`. Utilisez toujours des méthodes qui renvoient un nouveau tableau (`filter`, `map`) conjointement avec le modificateur d'état (`setCards`).
