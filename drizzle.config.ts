import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.PGDATABASE_URL || process.env.DATABASE_URL || "";

if (!dbUrl) {
  console.error("Error: PGDATABASE_URL or DATABASE_URL is not set");
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
