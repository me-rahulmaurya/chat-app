import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMessages = (selectedUser) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const authUser = JSON.parse(localStorage.getItem('chat-user'));

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/messages/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  return { messages, setMessages, loading };
};

export default useGetMessages;