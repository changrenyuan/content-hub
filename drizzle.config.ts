import { defineConfig } from "drizzle-kit";

// 优先使用 Vercel Postgres 的环境变量
const dbUrl = process.env.POSTGRES_URL || process.env.PGDATABASE_URL || process.env.DATABASE_URL || "";

if (!dbUrl) {
  console.error("Error: POSTGRES_URL or PGDATABASE_URL or DATABASE_URL is not set");
  process.exit(1);
}

export default defineConfig({
  schema: "./src/storage/database/shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: false,
});
