import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function Bikes({ bikesDb }) {
  const unfiltered = useRef([]);
  const filter = useRef('none');
  const [bikes, setBikes] = useState([]);
  const [category, setCategory] = useState({
    options: [],
    style: 'none',
    filter: 'none'
  });

  useEffect(() => {
    showUnavailable(false);

    return () => {
      setBikes([]);
      setCategory({
        options: [],
        style: 'none',
        filter: 'none'
      });
      unfiltered.current = [];
      filter.current = 'none';
    }
  }, []);

  const types = ['Mountain', 'Road', 'Electric', 'BMX', 'Foldable', 'Classic'];
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];

  const onChangeHandler = (e) => {
    if (e.target.value === 'None' || e.target.value === 'Type' || e.target.value === 'Size')
      getCategory(e.target.value);
    else if (e.target.checked === true || e.target.checked === false)
      showUnavailable(e.target.checked); 
    else 
      filterBikes(e.target.value);    
  }

  // Update select inputs
  const getCategory = (selected) => {
    switch(selected) {
      case 'None':
        setCategory({
          options: [],
          style: 'none',
          filter: 'none'
        });
        setBikes(unfiltered.current);
        break;
      case 'Type':
        setCategory({
          options: types,
          style: 'inline-block',
          filter: 'type'
        });
        break;
      case 'Size':
        setCategory({
          options: sizes,
          style: 'inline-block',
          filter: 'size'
        });
        break;
      default:
        return;
    }
  }

  // Filter rendered bikes
  const filterBikes = (selected) => {
    filter.current = selected;
    if (selected === 'none')
      setBikes(unfiltered.current);
    else
      setBikes(unfiltered.current.filter((bike) => bike[category.filter] == selected));
  }

  // Update bikes that will be filtered
  const showUnavailable = (isChecked) => {
    if (isChecked) {
      unfiltered.current = bikesDb;
    } else {
      unfiltered.current = bikesDb.filter((bike) => bike.isAvailable == true);
    }
    const selected = category.filter.charAt(0).toUpperCase() + category.filter.slice(1); 
    getCategory(selected);
    filterBikes(filter.current);
  }
  
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900'>Featured Bikes</h2>
          <div>
            <div>
              <label>Filter by:</label>
              <select 
                className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm'
                onChange={onChangeHandler}
                id='category'
              >
                <option>None</option>
                <option>Type</option>
                <option>Size</option>
              </select>
              <select 
                className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm'
                onChange={onChangeHandler}
                style={{display: category.style}}
                defaultValue=''
                id='filter'
              >
                <option disabled value=''>--</option>
                {category.options.map((opt, index) => 
                  <option key={index}>{opt}</option>
                )}
              </select>
            </div>
            <div className='flex items-center justify-end mb-4'>
              <input 
                type='checkbox' 
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
                onChange={onChangeHandler}
              />
              <label className='ms-2 text-sm font-sm'>Show unavailable</label>
            </div>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8'>
          {bikes.length == 0 
            ? (<h1 className='text-xl text-center font-semibold tracking-tight text-gray-900 col-span-full'>No available bikes</h1>) 
            : bikes.map((bike) => (
            <Link 
              to={`/rental-form/${bike.id}`} 
              key={bike.id} 
              className='group relative bg-stone-100 p-2 rounded-md'
            >
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50'>
                <img
                  src={`/${bike.type}.jpg`}
                  alt={bike.type}
                  className='h-auto w-full object-cover object-center'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700 font-semibold'>
                    <p href={bike.href}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {bike.type}
                    </p>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{bike.size}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>Php {bike.price}/day</p>
                  <div className='size-3 rounded-md float-right mt-4' style={{ backgroundColor: bike.isAvailable ? '#238823' : '#D2222D' }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
