import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Mission } from '@/types';

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'mission_catalog'), orderBy('difficulty'));
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const missionsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          missionId: doc.id,
        })) as Mission[];
        setMissions(missionsData);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { missions, loading, error };
}
