import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const authUser = JSON.parse(localStorage.getItem('chat-user'));

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useGetUsers;