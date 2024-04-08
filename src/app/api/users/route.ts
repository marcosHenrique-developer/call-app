import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export async function POST(res: NextApiResponse, req: NextApiRequest) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, username } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });
  return res.status(201).json(user);
}
