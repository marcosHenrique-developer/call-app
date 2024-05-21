/* eslint-disable @next/next/no-async-client-component */
'use client';

import { Avatar, Heading, Text } from '@ignite-ui/react';
import { prisma } from '../../../lib/prisma';
import { Container, UserHeader } from './style';
import { ScheduleForm } from './components/ScheduleForm';

export const revalidate = 86400; // 1 day

interface ScheduleProps {
  params: {
    username: string | string[];
  };
}

export default async function Schedule({ params }: ScheduleProps) {
  const user = await prisma.user.findFirst({
    where: {
      username: String(params.username),
    },
  });
  return (
    <Container>
      <UserHeader>
        <Avatar
          src={user?.avatar_url || ''}
          alt={user?.name}
          referrerPolicy="no-referrer"
        />

        <Heading>{user?.name}</Heading>
        <Text>{user?.bio}</Text>
      </UserHeader>
      <ScheduleForm />
    </Container>
  );
}
