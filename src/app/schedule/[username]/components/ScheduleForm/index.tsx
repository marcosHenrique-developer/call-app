'use client';

import { useState } from 'react';
import { CalendarStep } from './components/CalendarStep';
import { ConfirmStep } from './components/ConfirmStep';

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null);
  }

  if (selectedDateTime) {
    return <ConfirmStep />;
  }

  return <CalendarStep />;
}
