import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a sample workspace
  const workspace = await prisma.workspace.upsert({
    where: { whopCompanyId: 'sample-company' },
    update: {},
    create: {
      whopCompanyId: 'sample-company',
      name: 'Sample Company',
    },
  })

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { whopId: 'sample-user' },
    update: {},
    create: {
      whopId: 'sample-user',
      email: 'user@example.com',
      name: 'Sample User',
      workspaceId: workspace.id,
    },
  })

  // Create sample metrics
  const salesCallsMetric = await prisma.metric.create({
    data: {
      name: 'Sales Calls',
      description: 'Number of sales calls made',
      unit: 'calls',
      color: '#3b82f6',
      userId: user.id,
    },
  })

  const revenueMetric = await prisma.metric.create({
    data: {
      name: 'Revenue',
      description: 'Daily revenue generated',
      unit: 'dollars',
      color: '#10b981',
      userId: user.id,
    },
  })

  const workoutMetric = await prisma.metric.create({
    data: {
      name: 'Workout Minutes',
      description: 'Minutes spent exercising',
      unit: 'minutes',
      color: '#f59e0b',
      userId: user.id,
    },
  })

  // Create sample metric logs
  await prisma.metricLog.createMany({
    data: [
      { metricId: salesCallsMetric.id, userId: user.id, value: 15, date: new Date('2024-01-15'), notes: 'Morning calls' },
      { metricId: salesCallsMetric.id, userId: user.id, value: 12, date: new Date('2024-01-16'), notes: 'Afternoon calls' },
      { metricId: revenueMetric.id, userId: user.id, value: 2500, date: new Date('2024-01-15'), notes: 'Product sales' },
      { metricId: revenueMetric.id, userId: user.id, value: 3200, date: new Date('2024-01-16'), notes: 'Service sales' },
      { metricId: workoutMetric.id, userId: user.id, value: 45, date: new Date('2024-01-15'), notes: 'Cardio session' },
      { metricId: workoutMetric.id, userId: user.id, value: 30, date: new Date('2024-01-16'), notes: 'Strength training' },
    ],
  })

  // Create sample goals
  const salesGoal = await prisma.goal.create({
    data: {
      title: 'Increase monthly sales',
      description: 'Achieve $50k in monthly sales revenue',
      target: 50000,
      current: 35000,
      unit: 'dollars',
      cadence: 'MONTHLY',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      userId: user.id,
      metricId: revenueMetric.id,
    },
  })

  const callsGoal = await prisma.goal.create({
    data: {
      title: 'Complete 100 sales calls',
      description: 'Make 100 outbound sales calls this month',
      target: 100,
      current: 75,
      unit: 'calls',
      cadence: 'MONTHLY',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      userId: user.id,
      metricId: salesCallsMetric.id,
    },
  })

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Complete project proposal',
        description: 'Finish the Q1 project proposal document',
        status: 'PENDING',
        priority: 'HIGH',
        dueDate: new Date('2024-01-20'),
        tags: JSON.stringify(['work', 'documentation']),
        userId: user.id,
        goalId: salesGoal.id,
      },
      {
        title: 'Review team performance',
        description: 'Analyze team metrics and prepare report',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2024-01-18'),
        tags: JSON.stringify(['work', 'analysis']),
        userId: user.id,
      },
      {
        title: 'Update website content',
        description: 'Refresh homepage and about page content',
        status: 'COMPLETED',
        priority: 'LOW',
        dueDate: new Date('2024-01-16'),
        tags: JSON.stringify(['work', 'content']),
        userId: user.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

