// lib/store.ts
// In-memory store for demo. Replace with a real database (e.g., Prisma + PostgreSQL) in production.

export type Article = {
  id: string;
  title: string;
  topic: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  likedBy: string[]; // session IDs
  comments: Comment[];
};

export type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

export type Admin = {
  email: string;
  passwordHash: string; // In production use bcrypt
  name: string;
};

// Simple hash for demo (NOT secure for production - use bcrypt)
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Singleton store
const globalStore = global as typeof global & {
  articleStore?: {
    articles: Article[];
    admins: Admin[];
  };
};

if (!globalStore.articleStore) {
  globalStore.articleStore = {
    admins: [
      {
        email: "admin@articlewriter.com",
        passwordHash: simpleHash("admin123"),
        name: "Admin User",
      },
    ],
    articles: [
      {
        id: "1",
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
        date: "2026-06-01",
        likes: 24,
        likedBy: [],
        comments: [
          {
            id: "c1",
            name: "Priya K.",
            text: "This is exactly what I needed to get started. Thank you!",
            date: "2026-06-02",
          },
        ],
      },
      {
        id: "2",
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

As you research, take notes in your own words. This helps you understand the material and avoid accidental plagiarism. Use a system — folders, tags, or a spreadsheet — to keep track of your sources.

## Use the Right Tools

Some helpful research tools:
- Google Scholar for academic papers
- Wikipedia for overview (but always check their sources)
- Library databases for in-depth research
- Government websites for statistics and official data

## Know When to Stop

Research can become a way of procrastinating. Set a time limit and stick to it. You can always do more research if gaps appear when you start writing.

Good research makes your writing authoritative and trustworthy. Your readers will thank you!`,
        author: "David Miller",
        date: "2026-05-28",
        likes: 18,
        likedBy: [],
        comments: [],
      },
      {
        id: "3",
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

Numbered headlines consistently outperform generic ones. "7 Ways to Write Better Headlines" is more compelling than "How to Write Better Headlines." Numbers set expectations and feel concrete.

## Ask Questions

Questions engage readers by making them want to know the answer. "Are You Making These Common Writing Mistakes?" pulls readers in because they want to find out.

## Use Power Words

Certain words trigger emotional responses:
- **Curiosity**: Secret, Surprising, Hidden
- **Authority**: Proven, Expert, Research-backed
- **Urgency**: Now, Today, Immediately
- **Benefit**: Easy, Fast, Free

## Test Your Headlines

Before you publish, write at least five different headlines for your article. Then choose the best one. Professional copywriters do this every time.

Remember: your headline is a promise. Make sure your article delivers on it!`,
        author: "Emma Wilson",
        date: "2026-05-25",
        likes: 31,
        likedBy: [],
        comments: [
          {
            id: "c2",
            name: "Ravi M.",
            text: "The Four U's framework is gold. Bookmarking this!",
            date: "2026-05-26",
          },
          {
            id: "c3",
            name: "Ananya S.",
            text: "I never knew headlines mattered so much. Great article!",
            date: "2026-05-27",
          },
        ],
      },
    ],
  };
}

export const store = globalStore.articleStore;
