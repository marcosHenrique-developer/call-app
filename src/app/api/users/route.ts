import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })
  return NextResponse.json(user, { status: 200 })
}
