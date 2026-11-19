'use client';

import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser('Alex');
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading user...</p>;
  }

  return <h1>Welcome, {user}!</h1>;
}