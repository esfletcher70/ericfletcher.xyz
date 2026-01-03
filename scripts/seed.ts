import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create test admin user
  const testAdminPassword = await bcrypt.hash('johndoe123', 10)
  const testAdmin = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: testAdminPassword,
      name: 'Test Admin',
      role: 'admin',
    },
  })
  console.log('Test admin user created:', testAdmin.email)

  // Create Eric's admin account
  const ericPassword = await bcrypt.hash('AdminPass123!', 10)
  const ericAdmin = await prisma.user.upsert({
    where: { email: 'eric@ericfletcher.xyz' },
    update: {},
    create: {
      email: 'eric@ericfletcher.xyz',
      password: ericPassword,
      name: 'Eric Fletcher',
      role: 'admin',
    },
  })
  console.log('Eric admin user created:', ericAdmin.email)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
