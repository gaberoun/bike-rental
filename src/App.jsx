import { useState, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import bikes from './../assets/bikes.json';
import rentedBikesDb from './../assets/rentedBikes.json';

// COMPONENTS
import Layout from './components/Layout';
import About from './components/About';
import Bikes from './components/Bikes';
import RentalForm from './components/RentalForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import UserAgreement from './components/UserAgreement';
import Receipt from './components/Receipt';
import Login from './components/Login';
import NotFound from './components/NotFound';


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_DB':
      return [...state, action.payload];
    case 'REMOVE_FROM_DB':
      return state.filter((order) => order.id != action.payload);
    default:
      return state;
  }
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, dispatch] = useReducer(reducer, rentedBikesDb);
  const [bikesDb, setBikesDb] = useState(bikes);

  return (
    <>
      <Routes>
        <Route 
          path='/login' 
          element={<Login setIsAdmin={setIsAdmin} />}   
        />
        <Route element={<Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}>
          <Route index element={isAdmin ? <Dashboard state={state} dispatch={dispatch} bikesDb={bikesDb} setBikesDb={setBikesDb} /> : <Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/bikes' element={<Bikes bikesDb={bikesDb} />} />
          <Route path='/rental-form/:bikeId' element={<RentalForm bikesDb={bikesDb} setBikesDb={setBikesDb} dispatch={dispatch} />} />
          <Route path='/receipt/:orderId' element={<Receipt state={state} />} />
        </Route>
        <Route path='/user-agreement' element={<UserAgreement />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
