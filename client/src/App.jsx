import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={authUser ? <Chat /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={!authUser ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!authUser ? <Signup /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;