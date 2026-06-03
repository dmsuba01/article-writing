# Article Writer — Complete Deployment Guide

## Project Overview

A full-stack Next.js 14 article writing app with:
- Home, About, Articles, Contact pages
- Admin login (email + password)
- Create, edit, delete articles (admin only)
- Like, comment, share articles (anyone)
- Search and filter by topic
- Add admin users (admin only)

---

## Project File Structure

```
article-writer/
├── app/
│   ├── layout.tsx                   ← Root layout
│   ├── page.tsx                     ← Home page
│   ├── globals.css                  ← Global styles
│   ├── not-found.tsx                ← 404 page
│   ├── about/
│   │   └── page.tsx                 ← About page
│   ├── articles/
│   │   ├── page.tsx                 ← Articles listing (server)
│   │   ├── ArticlesClient.tsx       ← Articles listing (client)
│   │   ├── ArticleForm.tsx          ← Create/edit form
│   │   ├── new/
│   │   │   └── page.tsx             ← Create article page
│   │   └── [id]/
│   │       ├── page.tsx             ← Individual article
│   │       ├── ArticleActions.tsx   ← Like/comment/share
│   │       └── edit/
│   │           └── page.tsx         ← Edit article page
│   ├── contact/
│   │   ├── page.tsx                 ← Contact page
│   │   └── ContactForm.tsx          ← Contact form
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts       ← POST /api/auth/login
│       │   ├── logout/route.ts      ← POST /api/auth/logout
│       │   ├── me/route.ts          ← GET /api/auth/me
│       │   └── add-admin/route.ts   ← POST /api/auth/add-admin
│       └── articles/
│           ├── route.ts             ← GET/POST /api/articles
│           └── [id]/
│               ├── route.ts         ← GET/PUT/DELETE /api/articles/:id
│               ├── like/route.ts    ← POST /api/articles/:id/like
│               └── comment/route.ts ← POST /api/articles/:id/comment
├── components/
│   ├── Header.tsx                   ← Navigation + login modal
│   └── Footer.tsx                   ← Footer
├── lib/
│   ├── store.ts                     ← In-memory data store
│   └── auth.ts                      ← Auth utilities
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Step 1: Set Up the Project Locally

### Prerequisites
- Node.js 18+ installed (https://nodejs.org)
- npm or yarn

### Steps

```bash
# 1. Create the project folder
mkdir article-writer
cd article-writer

# 2. Copy all the files from this guide into the correct paths

# 3. Install dependencies
npm install

# 4. Run in development mode
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Default Admin Login
- Email: `admin@articlewriter.com`
- Password: `admin123`

---

## Step 2: Test Locally

Before deploying, test all features:

- [ ] Home page loads with hero, stats, feature cards
- [ ] Articles page shows article cards
- [ ] Search and topic filter work
- [ ] Click an article card → full article opens
- [ ] Like button works (only once per session)
- [ ] Comment form works (no login needed)
- [ ] Share copies link
- [ ] Admin login modal opens
- [ ] Login with admin@articlewriter.com / admin123
- [ ] Create Article button appears when logged in
- [ ] Create a new article → appears in listing
- [ ] Edit an article → changes saved
- [ ] Delete an article → removed from listing
- [ ] Add Admin works
- [ ] Logout works
- [ ] About page renders correctly
- [ ] Contact form shows success message
- [ ] 404 page shows for unknown routes

---

## Step 3: Deploy to Vercel (Recommended — Free)

Vercel is the easiest way to deploy Next.js apps.

### Option A: Via Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from your project folder
cd article-writer
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? article-writer
# - In which directory is your code? ./
# - Override settings? No

# 4. For production deployment
vercel --prod
```

### Option B: Via GitHub + Vercel Dashboard

```bash
# 1. Create a GitHub repo
git init
git add .
git commit -m "Initial commit: Article Writer app"
git remote add origin https://github.com/YOUR_USERNAME/article-writer.git
git push -u origin main

# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repo
# 5. Keep all default settings
# 6. Click "Deploy"
```

Your app will be live at `https://article-writer-xxxx.vercel.app`

---

## Step 4: Deploy to Other Platforms

### Netlify
```bash
npm run build
# Upload the .next folder (not straightforward — Vercel preferred for Next.js)
```

### Railway
```bash
# Go to railway.app
# New Project → Deploy from GitHub
# Select your repo
# Railway auto-detects Next.js
```

### Self-hosted (VPS/Ubuntu)
```bash
# 1. SSH into your server
# 2. Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone your repo
git clone https://github.com/YOUR_USERNAME/article-writer.git
cd article-writer

# 4. Install and build
npm install
npm run build

# 5. Start with PM2 (keeps running after logout)
npm install -g pm2
pm2 start npm --name "article-writer" -- start
pm2 save
pm2 startup
```

---

## Step 5: Set Up a Real Database (Production Upgrade)

The current app uses in-memory storage — **data resets when the server restarts**. For a real production app, add a database.

### Option: Vercel Postgres (simplest)

```bash
# 1. In Vercel dashboard → Storage → Create Database → Postgres
# 2. Install Prisma
npm install @prisma/client prisma

# 3. Initialize Prisma
npx prisma init

# 4. Add schema (prisma/schema.prisma):
```

```prisma
model Article {
  id        String    @id @default(cuid())
  title     String
  topic     String
  excerpt   String
  content   String    @db.Text
  author    String
  date      String
  likes     Int       @default(0)
  comments  Comment[]
  createdAt DateTime  @default(now())
}

model Comment {
  id        String   @id @default(cuid())
  name      String
  text      String
  date      String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  articleId String
}

model Admin {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
  name         String
}
```

```bash
# 5. Run migrations
npx prisma migrate dev --name init

# 6. Replace store.ts calls with Prisma client calls in API routes
```

### Option: Supabase (PostgreSQL + free tier)
- Go to supabase.com → New project
- Get your connection string
- Use with Prisma as above

---

## Step 6: Add Real Email for Contact Form

Replace the mock in `app/contact/ContactForm.tsx`:

```bash
npm install resend
```

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'support@articlewriter.com',
    subject: `[Contact] ${subject}`,
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
  });
  return Response.json({ ok: true });
}
```

---

## Step 7: Secure for Production

Replace the simple hash in `lib/store.ts` with bcrypt:

```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

```typescript
import bcrypt from 'bcryptjs';

// When creating admin:
const passwordHash = await bcrypt.hash(password, 10);

// When verifying:
const valid = await bcrypt.compare(password, admin.passwordHash);
```

---

## Environment Variables

Create a `.env.local` file (never commit to git):

```env
# Session secret (generate a random string)
SESSION_SECRET=your-super-secret-key-here

# Database (if using Prisma)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Email (if using Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

Add these in Vercel: Dashboard → Project → Settings → Environment Variables

---

## Summary

| Step | What | Tool |
|------|------|------|
| 1 | Copy files, install deps | npm |
| 2 | Test locally | npm run dev |
| 3 | Deploy | Vercel (free) |
| 4 | Add database | Vercel Postgres / Supabase |
| 5 | Add email | Resend |
| 6 | Secure passwords | bcrypt |

**Your app is production-ready for demo/portfolio use right now. Add the database for a fully persistent production app.**
