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
import Devices from './components/pages/commercial/Devices';
import TimeSlots from './components/pages/commercial/TimeSlots';
import AddDevice from './components/pages/commercial/AddDevice';
import AddTimeSlot from './components/pages/commercial/AddTimeSlot';
import Orders from './components/pages/commercial/Orders';
import ContractOrders from './components/pages/contract/Orders'
import Coworkers from './components/pages/commercial/Coworkers';
import AddCoworker from './components/pages/commercial/AddCoworker';
import CommercialBrewery from './components/pages/commercial/CommercialBrewery';
import MyAccount from './components/pages/commercial/MyAccount';

import './App.css';
import ContractDashboard from './components/pages/contract/ContractDashboard';

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
                    path="/commercial/account"
                    element={
                        <ProtectedRoute>
                            <MyAccount />
                        </ProtectedRoute>
                    }
                />
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
                <Route
                    path="/commercial/coworkers/add"
                    element={
                        <ProtectedRoute>
                            <AddCoworker />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/brewery"
                    element={
                        <ProtectedRoute>
                            <CommercialBrewery />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contract/dashboard"
                    element={
                        <ProtectedRoute>
                            <ContractDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/orders"
                    element={
                        <ProtectedRoute>
                            <ContractOrders />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
