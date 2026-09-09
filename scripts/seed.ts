import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || 'eric@ericfletcher.xyz'
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME || 'Eric Fletcher'

  if (!password) {
    throw new Error('SEED_ADMIN_PASSWORD is required (no default)')
  }

  const hashed = await bcrypt.hash(password, 10)
  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: 'admin', name },
    create: { email, password: hashed, name, role: 'admin' },
  })

  console.log('Admin user ready:', admin.email)
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
