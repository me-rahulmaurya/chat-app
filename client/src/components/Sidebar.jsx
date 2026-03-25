import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/SocketContext';
import useGetUsers from '../hooks/useGetUsers';

const Sidebar = ({ selectedUser, setSelectedUser, isOpen, setIsOpen }) => {
  const [search, setSearch] = useState('');
  const { logout } = useContext(AuthContext);
  const { onlineUsers } = useContext(SocketContext);
  const { users, loading } = useGetUsers();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        className='sidebar-toggle'
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? '✕' : '💬'}
      </button>


      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className='sidebar-header'>
          <h2>💬 Chats</h2>
          <button className='logout-btn' onClick={logout}>
            Logout
          </button>
        </div>

        <div className='sidebar-search'>
          <input
            type='text'
            placeholder='Search users...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='users-list'>
          {loading ? (
            <p className='loading-text'>Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className='loading-text'>No users found</p>
          ) : (
            filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isActive = selectedUser?._id === user._id;

              return (
                <div
                  key={user._id}
                  className={`user-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsOpen(false);
                  }}
                >
                  <div className='avatar'>
                    <div className='avatar-circle'>{user.username[0]}</div>
                    {isOnline && <div className='online-dot' />}
                  </div>
                  <div className='user-info'>
                    <span>{user.username}</span>
                    <small>{isOnline ? '🟢 Online' : 'Offline'}</small>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;