import { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';

const useSendMessage = (selectedUser, setMessages) => {
  const [sending, setSending] = useState(false);

  const { socket } = useContext(SocketContext);
  const { authUser } = useContext(AuthContext);

  const sendMessage = (messageText) => {
    if (!messageText.trim() || !selectedUser || !socket) return;

    setSending(true);

    socket.emit('sendMessage', {
      senderId: authUser._id,
      receiverId: selectedUser._id,
      message: messageText,
    });

    socket.once('messageSaved', (savedMessage) => {
      setMessages((prev) => [...prev, savedMessage]);
      setSending(false);
    });
  };

  return { sendMessage, sending };
};

export default useSendMessage;