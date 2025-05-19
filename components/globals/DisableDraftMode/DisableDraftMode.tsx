'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { disableDraftMode } from '@/app/actions';

export function DisableDraftMode() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="fixed bottom-0 right-0 z-10 p-4">
      {isPending ? (
        'Disabling draft mode...'
      ) : (
        <button onClick={disable}>Disable draft mode</button>
      )}
    </div>
  );
}
