import { useState } from 'react';
import Accordion from './Accordion';

const stats = [
  { name: 'Weekly users', value: '80+' },
  { name: 'Featured bikes', value: '30' },
  { name: 'Accidents reported', value: '0' },
  { name: 'CO2 emissions avoided', value: '0.08t' },
];

export default function About() {
  const [accordions, setAccordion] = useState([ 
    { 
      key: 1, 
      title: 'What modes of payment are accepted?', 
      data: 'You can pay with either credit or cash upon receiving the bike in our location.', 
      isOpen: true
    }, 
    { 
      key: 2, 
      title: 'What happens if I return an overdue bike?', 
      data: 'There will be an additional charge of Php 200 per day not returned.', 
      isOpen: false
    }, 
    { 
      key: 3, 
      title: 'Can people below 18 years old rent a bike?', 
      data: 'Minors are allowed to rent a bike with an assistance from an adult who is responsible for understanding the required forms.', 
      isOpen: false
    }, 
    { 
      key: 4, 
      title: 'Can I still borrow the bike after losing my receipt screenshot?', 
      data: 'Yes you can still borrow the bike. Just present your ID as your order is recorded in our system.', 
      isOpen: false
  }, 
]); 

const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = accordions.map((accord) => { 
        if (accord.key === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAccordion(updatedAccordions); 
}; 

  return (
    <div className='relative isolate overflow-hidden py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-6xl'>Ride with us</h2>
          <p className='mt-6 text-lg leading-8 text-gray-500'>
            One Ride Away is a bike rental service that offers a wide range of bicycles ready to be used. 
            From strolling around the city to conquering tough trails, you will find the perfect ride here.
          </p>
        </div>
        
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
          <dl className='mt-16 grid grid-cols-2 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.name} className='flex flex-col-reverse'>
                <dt className='text-base leading-7 text-gray-500'>{stat.name}</dt>
                <dd className='text-2xl font-bold leading-9 tracking-tight'>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-4xl'>Frequently Asked Questions</h2>
          <div className='mx-auto mt-10 lg:mx-0 lg:max-w-none'>
            {accordions.map((accordion) => ( 
              <Accordion 
                key={accordion.key} 
                title={accordion.title} 
                data={accordion.data} 
                isOpen={accordion.isOpen} 
                toggleAccordion={() => toggleAccordion(accordion.key)} 
              /> 
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}