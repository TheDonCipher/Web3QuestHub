import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { MissionStatus } from '@/types';

export function useMissionStatus(userId: string | undefined) {
  const [statuses, setStatuses] = useState<Record<string, MissionStatus>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setStatuses({});
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'mission_status'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const statusMap: Record<string, MissionStatus> = {};
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data() as MissionStatus;
          statusMap[data.missionId] = data;
        });
        setStatuses(statusMap);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const getStatus = (missionId: string): MissionStatus['status'] => {
    return statuses[missionId]?.status || 'available';
  };

  return { statuses, getStatus, loading, error };
}
