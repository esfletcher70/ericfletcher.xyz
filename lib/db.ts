import 'server-only'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

/**
 * Neon driver adapter (WebSocket transport) so Prisma runs on the Cloudflare
 * Workers runtime with no native query-engine binary/process. A non-Neon URL
 * (localhost) falls back to the standard engine over TCP for local dev.
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
