'use client';

import { useState, useEffect } from 'react';
import { UserQuest } from '../types';
import { getUserQuests } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useUserQuests = () => {
  const { user } = useAuth();
  const [userQuests, setUserQuests] = useState<UserQuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserQuests = async () => {
      if (!user) {
        setUserQuests([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserQuests(user.uid);
        setUserQuests(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserQuests();
  }, [user]);

  return { userQuests, loading, error };
};
