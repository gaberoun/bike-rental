import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Dashbaord({ state, dispatch, bikesDb, setBikesDb }) {
  // Highlight details that are today
  const dateToday = useRef(new Date().toISOString().split('T')[0]);

  const deleteOrder = (order) => {
    // Update both databases
    const newBikeData = {...order.bike, isAvailable: true};
    const newBikesDb = bikesDb.filter((bike) => bike.id != order.bike.id);
    setBikesDb([...newBikesDb, newBikeData]);
    dispatch({ type: 'REMOVE_FROM_DB', payload: order.id })
  }
  
  return (
    <div className='mx-auto max-w-2xl py-24 px-2 md:px-0 sm:py-32'>
      <h1 className='text-3xl text-center md:text-left font-bold tracking-tight text-gray-900 sm:text-5xl'>Dashboard</h1>
      <div className='mt-10 shadow-md rounded-lg p-4'>
        <div className='grid grid-flow-col grid-cols-5 gap-x-6 pb-2 text-center text-sm font-semibold border-b border-black'>
          <p className='col-span-2'>User</p>
          <p  className='col-start-3'>Borrow Date</p>
          <p  className='col-start-4'>Return Date</p>
        </div>
        <ul className='divide-y divide-gray-100 max-h-96 overflow-auto no-scrollbar'>
          {state.map((entry) => (
            <li key={entry.id} className='grid grid-flow-col grid-cols-5 items-center justify-stretch gap-x-6 py-5'>
              <div className='flex gap-3 col-span-2'>
                <button 
                  className='text-xs rounded-lg bg-red-500 text-white px-1 self-center'
                  onClick={() => deleteOrder(entry)}
                >
                  X
                </button>
                <div>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>{entry.user.name}</p>
                  <p className='mt-1 text-xs leading-5 text-gray-500'>{`0${entry.user.phone}`}</p>
                </div>
              </div>
              <p 
                className='col-start-3 text-sm leading-6 text-gray-900 text-center' 
                style={{color: entry.user.borrowDate === dateToday.current ? 'red' : 'black'}}
              >
                {entry.user.borrowDate}
              </p>
              <p 
                className='col-start-4 text-sm leading-6 text-gray-900 text-center' 
                style={{color: entry.user.returnDate === dateToday.current ? 'red' : 'black'}}
              >
                {entry.user.returnDate}
              </p>
              <Link 
                className='text-sm col-start-5 rounded-md bg-stone-200 px-1 py-1 text-center shadow-sm hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-200'
                to={`/receipt/${entry.id}`}
              >
                View Receipt
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
