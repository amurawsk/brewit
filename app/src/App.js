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
import ContractDashboard from './components/pages/contract/ContractDashboard';
import Devices from './components/pages/commercial/Devices';
import TimeSlots from './components/pages/commercial/TimeSlots';
import AddDevice from './components/pages/commercial/AddDevice';
import AddTimeSlot from './components/pages/commercial/AddTimeSlot';
import Orders from './components/pages/commercial/Orders';
import ContractOrders from './components/pages/contract/Orders'
import Coworkers from './components/pages/commercial/Coworkers';
import ContractCoworkers from './components/pages/contract/Coworkers';
import AddCoworker from './components/pages/commercial/AddCoworker';
import ContractAddCoworker from './components/pages/contract/AddCoworker';
import CommercialBrewery from './components/pages/commercial/CommercialBrewery';
import ContractBrewery from './components/pages/contract/ContractBrewery';
import MyAccount from './components/pages/commercial/MyAccount';
import ContractAccount from './components/pages/contract/MyAccount';

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
                    path="/commercial/account"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <MyAccount />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/dashboard"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <CommercialDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/devices"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <Devices />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/devices/add"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <AddDevice />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/time_slots"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <TimeSlots />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/time_slots/add"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <AddTimeSlot />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/orders"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/coworkers"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <Coworkers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/coworkers/add"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <AddCoworker />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/commercial/brewery"
                    element={
                        <ProtectedRoute requiredType="commercial_brewery">
                            <CommercialBrewery />
                        </ProtectedRoute>
                    }
                />

                {/* CONTRACT */}
                <Route
                    path="/contract/account"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractAccount />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/dashboard"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/orders"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractOrders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/coworkers"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractCoworkers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/coworkers/add"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractAddCoworker />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/contract/brewery"
                    element={
                        <ProtectedRoute requiredType="contract_brewery">
                            <ContractBrewery />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
