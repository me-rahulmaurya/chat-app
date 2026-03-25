import { useState, useEffect, useRef, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import useGetMessages from '../hooks/useGetMessages';
import useSendMessage from '../hooks/useSendMessage';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ selectedUser }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { authUser } = useContext(AuthContext);

  const { messages, setMessages, loading } = useGetMessages(selectedUser);
  const { sendMessage, sending } = useSendMessage(selectedUser, setMessages);

  const isOnline = useContext(SocketContext).onlineUsers.includes(
    selectedUser?._id
  );

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const isFromSelected =
        newMessage.senderId === selectedUser?._id &&
        newMessage.receiverId === authUser._id;

      if (isFromSelected) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, selectedUser, authUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedUser) {
    return (
      <div className='chat-window'>
        <div className='chat-placeholder'>
          <div className='chat-placeholder-icon'>💬</div>
          <h3>Welcome, {authUser.username}!</h3>
          <p>Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <div className='avatar'>
          <div className='avatar-circle'>{selectedUser.username[0]}</div>
          {isOnline && <div className='online-dot' />}
        </div>
        <div className='chat-header-info'>
          <span>{selectedUser.username}</span>
          <small className={isOnline ? '' : 'offline-status'}>
            {isOnline ? 'Online' : 'Offline'}
          </small>
        </div>
      </div>

      <div className='messages-container'>
        {loading ? (
          <div className='messages-loading'>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className='messages-loading'>
            No messages yet — say hello! 👋
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className='chat-input-area'>
        <input
          type='text'
          placeholder='Type a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className='send-btn'
          onClick={handleSend}
          disabled={sending || !input.trim()}
        >
          🚀
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;