import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import RegisterBrewery from './components/RegisterBrewery';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
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
import Equipment from './components/Equipment';
import TimeSlots from './components/TimeSlots';
import InUse from './components/InUse';

function App() {
  return (
    <Router>
      <Routes>
	  	<Route path="/" element={<WelcomePage />} />
		<Route path="/register_brewery" element={<RegisterBrewery />} />
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
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/time_slots" element={<TimeSlots />} />
        <Route path="/in_use" element={<InUse />} />
      </Routes>
    </Router>
  );
}

export default App;
