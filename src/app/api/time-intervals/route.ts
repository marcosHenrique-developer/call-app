import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const timeIntervalsBodySchema = z.object({
  intervals: z
    .array(
      z.object({
        endTimeInMinutes: z.number(),
        startTimeInMinutes: z.number(),
        weekDay: z.number().int().min(0).max(6),
      }),
    )
    .max(7)
    .min(1)
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        ),
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json('error', { status: 405 })
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: 'Faça o login e tente novamente.' },
      { status: 401 },
    )
  }

  const requestBody = await req.json()

  const body = timeIntervalsBodySchema.safeParse(requestBody)

  if (!body.success) {
    return NextResponse.json(
      {
        error: body.error,
      },
      { status: 400 },
    )
  }

  const { data } = body

  await Promise.all(
    data.intervals.map((interval) =>
      prisma.userTimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          user_id: session?.user?.id,
          week_day: interval.weekDay,
        },
      }),
    ),
  )

  return NextResponse.json(
    {},
    {
      status: 201,
    },
  )
}
