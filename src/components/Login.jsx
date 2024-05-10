import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Array of objects used to be flexible in case of multiple admins
const admins = [
  {username: 'admin', password: 'admin123'}
];

export default function Login({ setIsAdmin }) {
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const validationHandler = () => {
    const formErrors = {};

    // Handle empty fields
    Object.entries(data).forEach(([key, val]) => {
      if (val === '') formErrors[key] = 'Fill in required field';
    });

    // Handle authentication
    let admin;
    for (let account of admins) {
      if (account.username === data.username && account.password === data.password) {
        admin = account;
      }
    }
    if (!admin) formErrors['username'] = 'Username or password may be wrong';
    if (!admin) formErrors['password'] = 'Username or password may be wrong';
   
    // Form is not valid if there is an error
    if (Object.keys(formErrors).length > 0) {
      setErrors({...formErrors});
      return false;
    } 

    setIsAdmin(true);
    return true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validationHandler();

    if (isValid) {
      navigate('/');
    } else {
      alert('Something went wrong.');
    }
  }

  useEffect(() => {
    if (data.password.length > 3) setIsDisabled(false);
    else setIsDisabled(true);
  }, [data.password]);

  const style = isDisabled
    ? 'flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm' 
    : 'flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
    <Link to='/' className='text-green-500 font-semibold text-center hover:text-green-400'>← Back to Home</Link>
    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Login</h2>
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <form className='space-y-6' onSubmit={submitHandler}>
        <div>
          <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
            Username
          </label>
          <div className='mt-2'>
            <input
              name='username'
              type='text'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
              value={data.username}
              onChange={(e) => setData({...data, username: e.target.value})}
            />
            <p className='text-red-500 text-sm absolute'>{ errors['username'] }</p>
          </div>
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Password
            </label>
          </div>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
            <p className='text-red-500 text-sm absolute'>{ errors['password'] }</p>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className={style}
            disabled={isDisabled}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
