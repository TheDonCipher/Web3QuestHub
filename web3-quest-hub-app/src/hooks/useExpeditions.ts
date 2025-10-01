import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Expedition } from '@/types';

export function useExpeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'expedition_catalog'), orderBy('order'));
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const expeditionsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          expeditionId: doc.id,
        })) as Expedition[];
        setExpeditions(expeditionsData);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { expeditions, loading, error };
}
