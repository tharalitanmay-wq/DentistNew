'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/xkqmpqwzvkjrhfn');
  }, [router]);

  return (
    <div className="max-w-md mx-auto py-32 text-center text-slate-400">
      Redirecting to secret admin portal...
    </div>
  );
}
