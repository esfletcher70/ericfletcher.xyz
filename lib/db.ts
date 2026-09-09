import 'server-only'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

/**
 * Route pooled queries over stateless HTTP `fetch` instead of a persistent
 * WebSocket. The Prisma client is instantiated once per Worker isolate and
 * reused across requests; a WebSocket opened for request A cannot be touched
 * from request B ("Cannot perform I/O on behalf of a different request"), which
 * surfaced as intermittent 500s. `fetch` carries no cross-request state.
 * Every query in this app is a single statement (no interactive transactions),
 * so nothing needs the WebSocket path.
 */
neonConfig.poolQueryViaFetch = true

/**
 * Neon driver adapter so Prisma runs on the Cloudflare Workers runtime with no
 * native query-engine binary/process. A non-Neon URL (localhost) falls back to
 * the standard engine over TCP for local dev.
 */
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not set')

  if (!/neon\.tech|neon\.build/.test(connectionString)) {
    return new PrismaClient()
  }

  // Strip query params (e.g. `channel_binding=require`) the Neon driver rejects.
  const adapter = new PrismaNeon({ connectionString: connectionString.split('?')[0] })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
