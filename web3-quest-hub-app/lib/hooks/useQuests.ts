'use client';

import { useState, useEffect } from 'react';
import { Quest } from '../types';
import { getQuests } from '../firebase/firestore';

export const useQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        const data = await getQuests();
        setQuests(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  return { quests, loading, error };
};
