This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🗺️ Project Map

### 🔌 API Routes
| Route | Description | Link |
|-------|-------------|------|
| `/api/chat` | AI Chat (streamText/Vercel AI SDK) | [Test](http://localhost:3000/api/chat) |
| `/api/models` | Dynamic Model Discovery (from Gateway) | [Test](http://localhost:3000/api/models) |
| `/api/stripe/checkout` | Create Stripe Checkout Session | [Test](http://localhost:3000/api/stripe/checkout) |
| `/api/ingestion_unstructured` | File Upload & Parsing | [Test](http://localhost:3000/api/ingestion_unstructured) |
| `/api/connector_nango` | Nango Auth & Session Token | [Test](http://localhost:3000/api/connector_nango) |

### 🪝 Webhooks
| Route | Description | Link |
|-------|-------------|------|
| `/api/webhooks/payment_stripe` | Stripe Events (Checkout, Invoice, Subscription) | [Test](http://localhost:3000/api/webhooks/payment_stripe) |
| `/api/webhooks/integration_nango` | Nango Sync Events | [Test](http://localhost:3000/api/webhooks/integration_nango) |

### ⏱️ Cron Jobs
| Route | Description | Link |
|-------|-------------|------|
| `/api/cron/queue_upstash_qstash` | Upstash QStash Queue Processing | [Trigger](http://localhost:3000/api/cron/queue_upstash_qstash) |

### 📄 Pages
| Path | Description | Access |
|------|-------------|--------|
| `/dashboard/overview` | Main Dashboard View | [Open](http://localhost:3000/dashboard/overview) |
| `/dashboard/chat` | AI Chat Interface | [Open](http://localhost:3000/dashboard/chat) |
| `/dashboard/settings` | Settings & Subscription | [Open](http://localhost:3000/dashboard/settings) |
| `/dashboard/knowledge` | Knowledge Base & Uploads | [Open](http://localhost:3000/dashboard/knowledge) |
| `/auth/signin` | Login Page | [Open](http://localhost:3000/auth/signin) |
| `/auth/signup` | Registration Page | [Open](http://localhost:3000/auth/signup) |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
