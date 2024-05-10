import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from './NotFound';

export default function Receipt({ state }) {
  const { orderId } = useParams();
  const [data, setData] = useState({
    id: '',
    bike: 
    {
      id: '',
      type: '',
      size: '',
      price: 0,
      isAvailable: false
    },
    user:
    {
      name: '',
      email: '',
      phone: '',
      card: '',
      borrowDate: '',
      returnDate: '',
      total: 0
    }
  });
  
  useEffect(() => {
    const filtered = state.filter((order) => order.id === orderId);
    setData(filtered[0]);
  }, []);

  if (!data) return <NotFound />

  return (
    <div className='relative isolate overflow-hidden py-12'>
      <div className='mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none'>
        <h1 className='text-center font-bold text-3xl'>Order Receipt</h1>
        <p className='text-center text-gray-900'>Please save a screenshot for faster processing.</p>
        <h2 className='mt-5 font-semibold text-md text-center'>Order ID: <span className='font-normal'>{data.id}</span></h2> 
        <p className='font-semibold text-md text-center'>Amount Due: <span className='font-normal'>{`Php ${data.user.total}`}</span></p> 
        <p className='font-semibold text-md text-center'>Rental Dates:
          <span className='font-normal'>{` From ${data.user.borrowDate} to ${data.user.returnDate}`}</span>
        </p> 
        <div className='mt-10 px-5 grid gap-8 sm:justify-items-center sm:grid-cols-2'>
          <div>
            <h2 className='font-semibold text-lg'>Bike Details</h2>
            <p>{`ID: ${data.bike.id}`}</p>
            <p>{`Type: ${data.bike.type}`}</p>
            <p>{`Size: ${data.bike.size}`}</p>
          </div>
          <div>
            <h2 className='font-semibold text-lg'>User Details</h2>
            <p>{`Name: ${data.user.name}`}</p>
            <p>{`Email: ${data.user.email}`}</p>
            <p>{`Phone: 0${data.user.phone}`}</p>
            <p>{`Card: ${data.user.card}`}</p>
          </div>
        <Link to='/' className='sm:col-span-2 mt-5 justify-self-center rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>Go back home</Link>
        </div>
      </div>
    </div>
  )
}
