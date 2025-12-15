# 🚀 Template Next.js — Guide de Démarrage

Ce dépôt est un **template GitHub prêt à l’emploi** basé sur **Next.js, Supabase, Upstash, AI providers et Stripe**.
Il permet de démarrer un nouveau projet rapidement, sans configuration initiale complexe.

---

## 🛠️ Installation & Démarrage

### Étape 1 — Installer les dépendances

Après avoir cloné le dépôt, installe les dépendances du projet :

```bash
pnpm install
```

Si nécessaire, autorise l’exécution des scripts de build :

```bash
pnpm approve-builds
```

---

### Étape 2 — Configurer les variables d’environnement

Le fichier `.env.local` n’est pas versionné.
Le projet fournit un fichier **`.env.example`** contenant toutes les variables requises.

```bash
cp .env.example .env.local
```

Renseigne ensuite les valeurs réelles dans `.env.local`.

---

### Étape 3 — Lancer le serveur de développement

Démarre l’application en local :

```bash
pnpm dev
```

L’application est accessible par défaut à l’adresse `http://localhost:3000`.

---

## ✏️ Personnalisation du Nom du Projet

Le nom par défaut du template est **template_next-js**.
Pour le modifier, mets à jour les fichiers suivants :

### Étape 1 — `package.json`

* Champ `"name"`

### Étape 2 — `src/app/dashboard_routing/layout.tsx`

* Titre affiché dans la sidebar

### Étape 3 — `src/app/dashboard_routing/page.tsx`

* Texte d’accueil