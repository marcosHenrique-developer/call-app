import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

interface IUserData {
  name: string
  username: string
}
export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json('error', { status: 405 })
  }

  const data: IUserData = await req.json()
  const { name, username } = data

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (userExists) {
    return NextResponse.json(
      { message: 'Username already exists' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookies().set('@call:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7Days
    path: '/',
  })

  return NextResponse.json(user, { status: 201 })
}
