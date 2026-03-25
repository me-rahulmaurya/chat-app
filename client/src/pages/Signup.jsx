import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      login(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h1>Create Account</h1>
        <p>Sign up to start chatting</p>

        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Enter your username'
              required
            />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
            />
          </div>

          <div className='form-group'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              required
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;