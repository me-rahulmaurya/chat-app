import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='chat-layout'>
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <ChatWindow
        selectedUser={selectedUser}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default Chat;