import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/db/schema.ts",
 out: "./lib/db/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})