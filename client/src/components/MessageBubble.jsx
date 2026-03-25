import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MessageBubble = ({ message }) => {
  const { authUser } = useContext(AuthContext);

  const isSent = message.senderId === authUser._id;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message-wrapper ${isSent ? 'sent' : 'received'}`}>
      <div className='message-group'>
        <div className='message-bubble'>{message.message}</div>
        <div className='message-time'>{formatTime(message.createdAt)}</div>
      </div>
    </div>
  );
};

export default MessageBubble;