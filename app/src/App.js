import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import AboutUs from './components/views/AboutUs';
import Manual from './components/views/Manual';
import Register from './components/views/Register';
import Login from './components/views/Login';
import CommercialDashboard from './components/pages/commercial/CommercialDashboard';
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
import Devices from './components/pages/commercial/Devices';
import TimeSlots from './components/pages/commercial/TimeSlots';
import PieceOfEquipment from './components/PieceOfEquipment';
import AddDevice from './components/pages/commercial/AddDevice';
import AddRecipe from './components/AddRecipe';
import AddTimeSlot from './components/pages/commercial/AddTimeSlot';
import Orders from './components/pages/commercial/Orders';
import Coworkers from './components/pages/commercial/Coworkers';
import './App.css';


function App() {
    return (
        <Router>
            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Navigate to="/about_us" />} />
                <Route path="/about_us" element={<AboutUs />} />
                <Route path="/manual" element={<Manual />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* PROTECTED */}
                <Route 
                    path="/commercial/dashboard" 
                    element={
                        <ProtectedRoute>
                            <CommercialDashboard />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/devices" 
                    element={
                        <ProtectedRoute>
                            <Devices />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/devices/add" 
                    element={
                        <ProtectedRoute>
                            <AddDevice />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/time_slots" 
                    element={
                        <ProtectedRoute>
                            <TimeSlots />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/time_slots/add" 
                    element={
                        <ProtectedRoute>
                            <AddTimeSlot />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/orders" 
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                        
                    }
                />
                <Route 
                    path="/commercial/coworkers" 
                    element={
                        <ProtectedRoute>
                            <Coworkers />
                        </ProtectedRoute>
                        
                    }
                />

                {/* TODO */}
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/users" element={<Users />} />
                <Route path="/register_user" element={<RegisterUser />} />
                <Route path="/contract_brewery" element={<ContractBrewery />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route
                    path="/commercial_breweries"
                    element={<CommercialBreweries />}
                />
                <Route
                    path="/commercial_brewery"
                    element={<CommercialBrewery />}
                />
                <Route
                    path="/piece_of_equipment"
                    element={<PieceOfEquipment />}
                />
                <Route path="/add_recipe" element={<AddRecipe />} />
            </Routes>
        </Router>
    );
}

export default App;
