import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

export default function RentalForm({ bikesDb, setBikesDb, dispatch }) {
  const { bikeId } = useParams();
  const navigate = useNavigate();

  const [bikeData, setBikeData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    card: '',
    borrowDate: '',
    returnDate: ''
  });

  const style = isDisabled
    ? 'flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm' 
    : 'flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'

  // Disable submit button if user agreement is not checked
  const handleCheckbox = (e) => {
    if (e.target.checked) setIsDisabled(false);
    else setIsDisabled(true);
  }

  const validationHandler = () => {
    const formErrors = {};
    const formatData = {
      ...data,
      name: data.name.trim().toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase() }),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      card: data.card.trim(),
    };

    // Handle non-alphabet names
    if (!formatData['name'].match(/^[a-zA-Z\s]*$/)) 
      formErrors['name'] = 'Input must only be letters';

    // Handle number inputs
    if (!formatData['phone'].match(/^\d{10}$/)) 
      formErrors['phone'] = 'Input a valid phone number';
    if (!formatData['card'].match(/^\d{16}$/)) 
      formErrors['card'] = 'Input a valid credit card number';

    // Handle email field
    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|.('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!formatData['email'].match(re))
      formErrors['email'] = 'Input a valid email address';

    // Handle date fields
    let dateToday = new Date().toISOString().split('T')[0];
    dateToday = new Date(dateToday);
    const dateBorrow = new Date(formatData.borrowDate);
    const dateReturn = new Date(formatData.returnDate);
    if (dateBorrow.getTime() < dateToday.getTime())
      formErrors['borrowDate'] = 'Please select a later date';
    if (dateReturn.getTime() < dateToday.getTime() || dateReturn.getTime() < dateBorrow.getTime())
      formErrors['returnDate'] = 'Please select a later date';

    // Handle empty fields
    Object.entries(formatData).forEach(([key, val]) => {
      if (val === '') 
        formErrors[key] = 'Fill in required field';
    });

    // Form is not valid if there is an error
    if (Object.keys(formErrors).length > 0) {
      setErrors({...formErrors});
      return;
    } 

    return formatData;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const validData = validationHandler();

    if (validData) {
      alert('Submitted.');

      // Store data after submission
      const newBikeData = {...bikeData, isAvailable: false};
      const newData = {
        id: uuid(),
        bike: {...bikeData},
        user: {...validData, total: getTotal()}
      };
      const newBikesDb = bikesDb.filter((bike) => bike.id != bikeId);
      setBikesDb([...newBikesDb, newBikeData]);
      dispatch({ type: 'ADD_TO_DB', payload: newData });

      // Navigate to receipt
      navigate(`/receipt/${newData.id}`);

    } else {
      alert('Something went wrong.');
    }
  }

  const getTotal = () => {
    const dateBorrow = new Date(data.borrowDate);
    const dateReturn = new Date(data.returnDate);
    const diff =  Math.floor((dateReturn - dateBorrow) / 86400000);
    return (diff + 1) * bikeData.price;
  }

  useEffect(() => {
    // Total amount due is shown if date is changed and total is not zero
    const price = getTotal();
    setTotal(price);
  }, [data.borrowDate, data.returnDate]);

  useEffect(() => {
    // Bike cannot be borrow if id is wrong or is unavailable
    const filtered = bikesDb.filter((bike) => bike.isAvailable && bike.id === bikeId)
    setBikeData(filtered[0]);
  }, []);
  

  if (!bikeData) return (
    <div className='isolate bg-white px-6 py-24 sm:py-32 lg:px-8 text-center'>
      <h1 className='text-xl font-semibold tracking-tight text-gray-900'>This bike cannot be borrowed</h1>
      <Link to='/bikes' className='text-green-500 font-semibold hover:text-green-400'>← Back to Featured</Link>
    </div>
  )

  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl py-12'>
        <div
          className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
          aria-hidden='true'
        >
        </div>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Bike Rental Form</h2>
        </div>

        <form className='mx-auto mt-10 max-w-xl' onSubmit={submitHandler}>
          <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>

            <div className='sm:col-span-2'>
              <label htmlFor='name' className='block text-sm font-semibold leading-6 text-gray-900'>
                Name
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='name'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.name } 
                  onChange={(e) => setData({ ...data, name: e.target.value })} 
                  placeholder='First Middle Last'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['name'] }</p>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
                Email
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='email'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.email } 
                  onChange={(e) => setData({ ...data, email: e.target.value })} 
                  placeholder='user@email.com'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['email'] }</p>
            </div>

            <div>
            <label htmlFor='phone-number' className='block text-sm font-semibold leading-6 text-gray-900'>
                Phone number
              </label>
              <div className='relative mt-2.5'>
                <div className='absolute inset-y-0 left-0 flex items-center'>
                  <p className='text-xs rounded-md border-0 bg-transparent my-auto px-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600'>
                    +63
                  </p>
                </div>
                <input
                  type='tel'
                  name='phone-number'
                  className='block w-full rounded-md border-0 px-3.5 py-2 pl-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.phone } 
                  onChange={(e) => setData({ ...data, phone: e.target.value })} 
                  placeholder='1112223333'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['phone'] }</p>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='phone' className='block text-sm font-semibold leading-6 text-gray-900'>
                Credit Card Number
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='card'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.card } 
                  onChange={(e) => setData({ ...data, card: e.target.value })} 
                  placeholder='1111222233334444'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['card'] }</p>
            </div>

            <div>
              <label htmlFor='borrow-date' className='block text-sm font-semibold leading-6 text-gray-900'>
                Borrow Date
              </label>
              <div className='relative mt-2.5'>
                <input
                  type='text'
                  onFocus={(e) => e.target.type='date'}
                  onBlur={(e) => e.target.type='text'}
                  name='borrow-date'
                  id='borrow-date'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.borrowDate } 
                  onChange={(e) => setData({ ...data, borrowDate: e.target.value })} 
                  placeholder='dd/mm/yyyy'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['borrowDate'] }</p>
            </div>

            <div>
              <label htmlFor='return-date' className='block text-sm font-semibold leading-6 text-gray-900'>
                Return Date
              </label>
              <div className='relative mt-2.5'>
                <input
                  type='text'
                  onFocus={(e) => e.target.type='date'}
                  onBlur={(e) => e.target.type='text'}
                  name='return-date'
                  id='return-date'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'
                  value={ data.returnDate } 
                  onChange={(e) => setData({ ...data, returnDate: e.target.value })} 
                  placeholder='dd/mm/yyyy'
                />
              </div>
              <p className='text-red-500 text-sm absolute'>{ errors['returnDate'] }</p>
            </div>

            <div>
              <p className='block text-m font-semibold leading-6 text-gray-900'>{total ? `Total: Php ${total}` : ''}</p>
            </div>

            <div className='flex items-center sm:col-span-2'>
              <input 
                onChange={handleCheckbox}
                type='checkbox' 
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
              />
              <label htmlFor='checkbox' className='ms-2 text-xs'>
                I am 18 years of age or older and agree to the terms and conditions of the
                  <Link to='/user-agreement' target='_blank' className='font-semibold'> User Agreement</Link>
              </label>
            </div>
          </div>

          <div className='mt-10'>
            <button
              type='submit'
              className={style}
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}