import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <img
        src='https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D'
        className='absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center'
      />
      <div className='relative isolate overflow-hidden py-24 mt-10 sm:py-32'>
        <div className='mx-auto max-w-4xl px-12 py-24 sm:py-32 backdrop-brightness-50'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              Explore your area with ease
            </h1>
            <p className='mt-6 text-lg leading-8 text-white'>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to='/bikes'
                className='rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
              >
                Get started
              </Link>
              <Link to='/about' className='text-sm font-semibold leading-6 text-white'>
                Learn more <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
