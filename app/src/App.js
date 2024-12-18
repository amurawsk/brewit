import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AboutUs from './components/views/AboutUs';
import Manual from './components/views/Manual';
import Register from './components/views/Register';
import Login from './components/views/Login';
import Dashboard from './components/pages/commercial/CommercialDashboard';
import Statistics from './components/Statistics';
import Users from './components/Users';
import RegisterUser from './components/RegisterUser';
import ContractBrewery from './components/ContractBrewery';
import Cart from './components/Cart';
import Contracts from './components/Contracts';
import Contract from './components/Contract';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import CommercialBreweries from './components/CommercialBreweries';
import CommercialBrewery from './components/CommercialBrewery';
import Device from './components/pages/commercial/Device';
import TimeSlot from './components/pages/commercial/TimeSlot'
import InUse from './components/InUse';
import PieceOfEquipment from './components/PieceOfEquipment';
import AddDevice from './components/pages/commercial/AddDevice';
import AddRecipe from './components/AddRecipe';
import AddTimeSlot from './components/pages/commercial/AddTimeSlot';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
		<Route path="/" element={<Navigate to="/about_us" />} />
		<Route path="/about_us" element={<AboutUs />} />
	  	<Route path="/manual" element={<Manual />} />
	  	<Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/users" element={<Users />} />
		    <Route path="/register_user" element={<RegisterUser />} />
        <Route path="/contract_brewery" element={<ContractBrewery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/commercial_breweries" element={<CommercialBreweries />} />
        <Route path="/commercial_brewery" element={<CommercialBrewery />} />
        <Route path="/device" element={<Device />} />
        <Route path="/time_slots" element={<TimeSlot />} />
        <Route path="/in_use" element={<InUse />} />
        <Route path="/piece_of_equipment" element={<PieceOfEquipment />} />
        <Route path="/add_device" element={<AddDevice />} />
        <Route path="/add_recipe" element={<AddRecipe />} />
        <Route path="/add_time_slot" element={<AddTimeSlot />} />
      </Routes>
    </Router>
  );
}

export default App;
