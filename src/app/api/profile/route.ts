import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: 'Faça o login e tente novamente.' },
      { status: 401 },
    )
  }

  const requestBody = await request.json()

  const body = updateProfileBodySchema.safeParse(requestBody)

  if (!body.success) {
    return NextResponse.json(
      {
        error: body.error,
      },
      { status: 400 },
    )
  }

  const { data } = body

  await prisma.user.update({
    data: {
      bio: data.bio,
    },
    where: { id: session.user.id },
  })

  return NextResponse.json(
    {},
    {
      status: 201,
    },
  )
}
