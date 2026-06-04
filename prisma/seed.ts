// prisma/seed.ts
// ─────────────────────────────────────────────────────────────────────────────
// Seeds your Neon database with the default admin and 3 sample articles.
//
// Run with:
//   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
//
// Or add to package.json:
//   "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }
// Then run: npx prisma db seed
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Simple hash — same algorithm as lib/store.ts simpleHash
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (safe to re-run)
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.admin.deleteMany();

  // ── Seed admin ──────────────────────────────────────────────────────────────
  await prisma.admin.create({
    data: {
      email: "admin@articlewriter.com",
      passwordHash: simpleHash("admin123"),
      name: "Admin User",
    },
  });
  console.log("✅ Admin seeded");

  // ── Seed articles ───────────────────────────────────────────────────────────
  const article1 = await prisma.article.create({
    data: {
      title: "Getting Started with Article Writing",
      topic: "Writing Tips",
      excerpt:
        "Learn the basics of writing compelling articles that engage your readers from start to finish.",
      content: `Writing articles is one of the most rewarding skills you can develop. Whether you're writing for a blog, a magazine, or just for yourself, the ability to communicate ideas clearly and engagingly is invaluable.

## Start with a Strong Headline

Your headline is the first thing readers see. It should be clear, specific, and intriguing. A good headline promises a benefit or raises a question that the article will answer.

## Know Your Audience

Before you write a single word, ask yourself: who am I writing for? Understanding your audience helps you choose the right tone, vocabulary, and level of detail.

## Structure Your Article

A well-structured article is easy to read. Use the classic structure:
- **Introduction**: Hook the reader and state your main point
- **Body**: Develop your ideas with evidence and examples
- **Conclusion**: Summarize and give the reader something to take away

## Write Simply and Clearly

Good writing is clear writing. Use short sentences. Avoid jargon. Read your work aloud — if it sounds awkward, rewrite it.

## Edit Ruthlessly

Your first draft is just the beginning. Great writing is rewriting. Cut unnecessary words, fix unclear sentences, and make sure every paragraph earns its place.

Start writing today — the only way to improve is to practice!`,
      author: "Sarah Johnson",
      likes: 24,
      likedBy: [],
    },
  });

  // Add comment to article 1
  await prisma.comment.create({
    data: {
      name: "Priya K.",
      text: "This is exactly what I needed to get started. Thank you!",
      articleId: article1.id,
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: "How to Research Effectively",
      topic: "Research",
      excerpt:
        "Master the art of gathering reliable information to support your articles with credible sources.",
      content: `Research is the backbone of great article writing. Without solid research, even beautifully written articles can mislead readers or fall apart under scrutiny.

## Use Multiple Sources

Never rely on a single source. Cross-check facts across at least three credible sources. This helps you spot errors and get a fuller picture of the topic.

## Evaluate Source Credibility

Not all sources are equal. Look for:
- **Authority**: Is the author an expert in the field?
- **Accuracy**: Are claims backed by evidence?
- **Currency**: Is the information up to date?
- **Purpose**: Is the source trying to inform or persuade?

## Take Organized Notes

As you research, take notes in your own words. This helps you understand the material and avoid accidental plagiarism.

## Use the Right Tools

Some helpful research tools:
- Google Scholar for academic papers
- Wikipedia for overview (but always check their sources)
- Library databases for in-depth research
- Government websites for statistics and official data

Good research makes your writing authoritative and trustworthy. Your readers will thank you!`,
      author: "David Miller",
      likes: 18,
      likedBy: [],
    },
  });

  const article3 = await prisma.article.create({
    data: {
      title: "Creating Engaging Headlines",
      topic: "Headlines",
      excerpt:
        "Discover techniques to write headlines that capture attention and encourage clicks.",
      content: `The headline is arguably the most important part of your article. Studies show that 80% of readers never get past the headline. If your headline doesn't hook them, the rest of your article goes unread.

## The Four U's Framework

Great headlines are:
- **Useful**: They promise a benefit to the reader
- **Urgent**: They create a sense of timeliness
- **Unique**: They stand out from similar content
- **Ultra-specific**: They use numbers and details

## Use Numbers

Numbered headlines consistently outperform generic ones. "7 Ways to Write Better Headlines" is more compelling than "How to Write Better Headlines."

## Ask Questions

Questions engage readers by making them want to know the answer. "Are You Making These Common Writing Mistakes?" pulls readers in.

## Use Power Words

Certain words trigger emotional responses:
- **Curiosity**: Secret, Surprising, Hidden
- **Authority**: Proven, Expert, Research-backed
- **Urgency**: Now, Today, Immediately

Remember: your headline is a promise. Make sure your article delivers on it!`,
      author: "Emma Wilson",
      likes: 31,
      likedBy: [],
    },
  });

  // Add comments to article 3
  await prisma.comment.createMany({
    data: [
      {
        name: "Ravi M.",
        text: "The Four U's framework is gold. Bookmarking this!",
        articleId: article3.id,
      },
      {
        name: "Ananya S.",
        text: "I never knew headlines mattered so much. Great article!",
        articleId: article3.id,
      },
    ],
  });

  console.log("✅ 3 articles seeded");
  console.log("✅ 3 comments seeded");
  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📧 Admin login: admin@articlewriter.com");
  console.log("🔑 Admin password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());