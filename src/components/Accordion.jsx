export default function Accordion(props) { 
  return (
    <div className='border border-stone-200 rounded-md mb-1'>
        <button
            className='w-full p-4 text-left bg-stone-100 hover:bg-stone-200 transition duration-300'
            onClick={props.toggleAccordion} 
        > 
            {props.title} 
            <span className={`float-right transform ${props.isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}> 
              🞃
            </span> 
          </button> 
          {props.isOpen && ( 
            <div className='p-4 bg-white'> 
                {props.data} 
            </div> 
          )} 
    </div> 
  ) 
}
