import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Featured', href: '/bikes' }
]

export default function Layout({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const style = ({isActive}) => {
    return {
      borderBottom: isActive ? '2px solid black' : 'none'
    }
  }

  const login = () => {
    if (!isAdmin)
      navigate('/login');
    else
      setIsAdmin(false);
  }

  return (
    <>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
          <div className='flex lg:flex-1'>
            <Link to='/' className='-m-1.5 p-1.5'>
              <h3 className='font-bold text-2xl'><span className='text-green-700'>Q</span>Sikleta</h3>
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.href} 
                className='text-sm font-semibold leading-6 text-gray-900'
                style={style}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <button 
              onClick={login} 
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {isAdmin ? 'Log out' : 'Log in as admin'} <span aria-hidden='true'>&rarr;</span>
            </button>
          </div>
        </nav>
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <Link to='/' className='-m-1.5 p-1.5'>
                <h3 className='font-bold text-2xl'><span className='text-green-700'>Q</span>Sikleta</h3>
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className='py-6'>
                  <button 
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    onClick={login}
                  >
                    {isAdmin ? 'Log out' : 'Log in as admin'}
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
