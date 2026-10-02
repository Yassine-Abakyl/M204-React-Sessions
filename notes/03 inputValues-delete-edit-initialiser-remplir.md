# React : Formulaires et Opérations CRUD

---

## 1. Récupérer les données des champs de saisie 

En React, la méthode standard pour récupérer les données d'un champ de saisie (`input`, `textarea`, `select`) s'appelle les **Composants Contrôlés (Controlled Components)**. 

### Le concept
Au lieu de laisser le navigateur ou le DOM gérer l'état du champ, c'est **React qui pilote la valeur de l'input** via le `state`. Le flux d'information est bidirectionnel :
1. Le `state` fournit la valeur de l'input (`value={text}`).
2. L'événement `onChange` met à jour le `state` dès que l'utilisateur tape un caractère.

### Exemple de syntaxe (Input unique)
```jsx
import React, { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    // event.target.value contient le texte saisi par l'utilisateur
    setName(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
        placeholder="Entrez votre nom"
      />
      <p>Valeur en temps réel : {name}</p>
    </div>
  );
}
```

### Gestion de plusieurs inputs (Formulaire complexe)
Pour éviter de créer un `useState` par champ, on utilise un **objet unique** pour représenter tout le formulaire. On utilise ensuite l'attribut `name` de l'input pour mettre à jour la bonne propriété de manière dynamique.

```jsx
const [formData, setFormData] = useState({
  username: '',
  email: ''
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  
  // Utilisation du spread operator (...) pour ne pas écraser les autres champs
  setFormData({
    ...formData,
    [name]: value // Syntaxe de propriété dynamique
  });
};
```

---

## 2. Remplir et Initialiser un Formulaire (Remplir - Initialisation)

L'initialisation d'un formulaire consiste à définir ses valeurs de départ (vides pour une création, ou pré-remplies pour une modification).

### Initialisation à vide (Création)
Il suffit de passer un objet contenant des chaînes de caractères vides ou des valeurs par défaut dans le `useState`.

```jsx
const initialFormState = { title: '', description: '', category: 'General' };
const [form, setForm] = useState(initialFormState);

// Vider le formulaire après soumission
const handleSubmit = (e) => {
  e.preventDefault();
  // Logique d'envoi...
  setForm(initialFormState); // Réinitialisation automatique
};
```

### Pré-remplir le formulaire (Édition / Modification)
Pour modifier une entité existante, il faut injecter les données de cette entité directement dans le `state` du formulaire. Dès que le `state` change, React met automatiquement à jour les valeurs affichées à l'écran.

```jsx
// Exemple : Lorsque l'utilisateur clique sur "Modifier" un article existant
const handleEditClick = (articleExistant) => {
  setForm({
    title: articleExistant.title,
    description: articleExistant.description,
    category: articleExistant.category
  });
};
```

---

## 3. Le CRUD en React : Focus sur la Modification et la Suppression

Le CRUD (**C**reate, **R**ead, **U**pdate, **D**elete) repose sur le principe d'**immutabilité** en React : on ne modifie jamais directement le tableau d'origine, on crée une copie modifiée que l'on passe au setter du state.

Prenons un exemple où notre `state` principal contient une liste d'utilisateurs :
```jsx
const [users, setUsers] = useState([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]);
```

### A. La Suppression (Delete)
Pour supprimer un élément d'une liste, la méthode la plus propre et performante est d'utiliser `.filter()`. Elle retourne un nouveau tableau excluant l'élément ciblé par son identifiant unique (`id`).

```jsx
const deleteUser = (idToDelete) => {
  // On ne garde que les éléments dont l'id est DIFFÉRENT de celui à supprimer
  const updatedUsers = users.filter(user => user.id !== idToDelete);
  
  // Mise à jour du state pour déclencher le re-rendu
  setUsers(updatedUsers);
};
```

### B. La Modification (Update)
La modification nécessite deux étapes majeures dans l'interface utilisateur :
1. **Passer en mode édition** : Sélectionner l'élément à modifier et charger ses données actuelles dans le formulaire (voir section 2). Retenir l'ID de cet élément dans un state temporaire (ex: `currentId`).
2. **Enregistrer les modifications** : Utiliser la méthode `.map()` pour parcourir le tableau, localiser l'élément par son ID, remplacer ses données par les nouvelles saisies, et laisser les autres éléments intacts.

```jsx
const [isEditing, setIsEditing] = useState(false);
const [currentId, setCurrentId] = useState(null);

// 1. Charger l'élément dans le formulaire
const startEdit = (user) => {
  setIsEditing(true);
  setCurrentId(user.id);
  setForm({ name: user.name }); // Initialise le formulaire avec le nom actuel
};

// 2. Sauvegarder la modification
const saveUpdate = (e) => {
  e.preventDefault();
  
  const updatedUsers = users.map(user => {
    if (user.id === currentId) {
      // On retourne une copie de l'élément avec le nouveau nom
      return { ...user, name: form.name };
    }
    // On retourne l'élément inchangé pour les autres
    return user;
  });

  setUsers(updatedUsers);
  setIsEditing(false); // Quitte le mode édition
  setCurrentId(null);
  setForm({ name: '' }); // Vide le formulaire
};
```

---

## Synthèse visuelle des méthodes JavaScript pour le CRUD

| Opération | Méthode JS recommandée | Principe clé en React |
| :--- | :--- | :--- |
| **Create** (Ajouter) | `[...prevArray, newItem]` (Spread) | Ajoute à la fin sans modifier le tableau initial. |
| **Read** (Afficher) | `.map()` | Transforme les données brutes en composants JSX. |
| **Update** (Modifier) | `.map()` avec une condition `if(item.id === targetId)` | Remplace uniquement l'objet correspondant à l'ID. |
| **Delete** (Supprimer) | `.filter(item => item.id !== targetId)` | Crée un tableau filtré en excluant l'ID cible. |
