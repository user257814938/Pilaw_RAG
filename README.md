This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🗺️ Project Map

### 🔌 API Routes
### 🔌 API Routes
| Route | Description | Link |
|-------|-------------|------|
| `/api/llm_ai-gateway/chat` | AI Chat (streamText/Vercel AI SDK) | [http://localhost:3000/api/llm_ai-gateway/chat](http://localhost:3000/api/llm_ai-gateway/chat) |
| `/api/llm_ai-gateway/models` | Dynamic Model Discovery (from Gateway) | [http://localhost:3000/api/llm_ai-gateway/models](http://localhost:3000/api/llm_ai-gateway/models) |
| `/api/payment_stripe/checkout` | Create Stripe Checkout Session | [http://localhost:3000/api/payment_stripe/checkout](http://localhost:3000/api/payment_stripe/checkout) |
| `/api/ingestion_unstructured` | File Upload & Parsing | [http://localhost:3000/api/ingestion_unstructured](http://localhost:3000/api/ingestion_unstructured) |
| `/api/connector_nango` | Nango Auth & Session Token | [http://localhost:3000/api/connector_nango](http://localhost:3000/api/connector_nango) |

### 🪝 Webhooks
| Route | Description | Link |
|-------|-------------|------|
| `/api/webhooks/payment_stripe` | Stripe Events (Checkout, Invoice, Subscription) | [http://localhost:3000/api/webhooks/payment_stripe](http://localhost:3000/api/webhooks/payment_stripe) |
| `/api/webhooks/integration_nango` | Nango Sync Events | [http://localhost:3000/api/webhooks/integration_nango](http://localhost:3000/api/webhooks/integration_nango) |

### ⏱️ Cron Jobs
| Route | Description | Link |
|-------|-------------|------|
| `/api/cron/queue_upstash_qstash` | Upstash QStash Queue Processing | [http://localhost:3000/api/cron/queue_upstash_qstash](http://localhost:3000/api/cron/queue_upstash_qstash) |

### 📄 Pages
| Path | Description | Access |
|------|-------------|--------|
| `/dashboard/chat` | AI Chat Interface | [http://localhost:3000/dashboard/chat](http://localhost:3000/dashboard/chat) |
| `/dashboard/settings` | Settings & Subscription | [http://localhost:3000/dashboard/settings](http://localhost:3000/dashboard/settings) |
| `/dashboard/analytics` | Analytics Dashboard | [http://localhost:3000/dashboard/analytics](http://localhost:3000/dashboard/analytics) |
| `/dashboard/file_uploader` | File Upload Interface | [http://localhost:3000/dashboard/file_uploader](http://localhost:3000/dashboard/file_uploader) |
| `/auth_supabase/signin` | Login Page | [http://localhost:3000/auth_supabase/signin](http://localhost:3000/auth_supabase/signin) |
| `/auth_supabase/signup` | Registration Page | [http://localhost:3000/auth_supabase/signup](http://localhost:3000/auth_supabase/signup) |

### 📂 Source Code Map
| Directory | Feature | Visible At (URL) |
|-----------|---------|------------------|
| `src/components/payment_stripe/pricing.tsx` | Stripe Pricing Table | [http://localhost:3000/dashboard/settings](http://localhost:3000/dashboard/settings) |
| `src/components/payment_stripe/billing.tsx` | Billing History/Portal | [http://localhost:3000/dashboard/settings](http://localhost:3000/dashboard/settings) |
| `src/components/dashboard/chat` | AI Chat Interface | [http://localhost:3000/dashboard/chat](http://localhost:3000/dashboard/chat) |
| `src/components/auth_supabase` | Authentication Forms | [http://localhost:3000/auth_supabase/signin](http://localhost:3000/auth_supabase/signin) |

## 🚀 Comment Lancer le Projet

1.  Ouvrez votre terminal à la racine du projet (`C:\Users\Asus Vivobook\Downloads\AAA\projet\pilaw`).
2.  Installez les dépendances (si ce n'est pas déjà fait) :
    ```bash
    pnpm install
    ```
3.  Lancez le serveur de développement :
    ```bash
    pnpm dev
    ```
4.  Ouvrez votre navigateur sur : [http://localhost:3000](http://localhost:3000).

## ✅ État des Fonctionnalités Vérifiées

| Fonctionnalité | État | Notes |
| :--- | :--- | :--- |
| **Authentification** | 🟢 Opérationnel | Redirection `/auth_supabase` fonctionnelle. Login/Signup accessibles. |
| **Tableau de Bord** | 🟢 Opérationnel | Protégé par middleware. Redirige vers login si non connecté. |
| **Paiement (Stripe)** | 🟢 Intégré | Page `/dashboard/settings` contient le PricingTable. Webhook configurer. |
| **Chat AI** | 🟠 Partiel | Route API active. Reranking (Cohere) désactivé temporairement pour stabiliser le build. |

## 🧪 Procédure de Test Détaillée

### 1. Authentification
*   Accédez à `http://localhost:3000`.
*   Tentez d'accéder à `http://localhost:3000/dashboard/settings`.
*   **Résultat attendu** : Redirection automatique vers `/auth_supabase/signin`.
*   Créez un compte ou connectez-vous.

### 2. Gestion de l'Abonnement (Stripe)
*   Une fois connecté, allez dans **Paramètres** (`/dashboard/settings`).
*   Vérifiez que les plans tarifaires (Gratuit / Pro) s'affichent.
*   Cliquez sur "S'abonner" pour tester la redirection vers le Checkout Stripe (mode test).

### 3. Chat & IA
*   Accédez à la page Chat.
*   Envoyez un message.
*   **Note** : Le "Reranking" avancé est désactivé. Le chat utilisera la recherche vectorielle standard.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
