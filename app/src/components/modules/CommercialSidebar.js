import React from "react";
import "./CommercialSidebar.css";
import { useNavigate } from 'react-router-dom';
import { FaBeer, FaTools, FaClock, FaClipboard, FaUsers, FaChartLine } from "react-icons/fa";

const CommercialSidebar = () => {
    const navigate = useNavigate();

    const goToDevices = () => navigate('/equipment')

    return (
    <div className="sidebar">
        <div className="sidebar-header">
            <span className="sidebar-header-small">Panel boczny</span>
            <span className="sidebar-header-large">Wybierz zakładkę</span>
        </div>
        <div className="sidebar-menu">
            <hr className="separator"></hr>
            <div className="sidebar-item">
                <FaBeer className="icon" />
                <div className="sidebar-text">
                    <span>Mój browar</span>
                    <span className="sidebar-description">Przejdź do widoku browaru</span>
                </div>
            </div>
            <div onClick={goToDevices} className="sidebar-item">
                <FaTools className="icon" />
                <div className="sidebar-text">
                    <span>Urządzenia</span>
                    <span className="sidebar-description">Przejdź do widoku urządzeń</span>
                </div>
            </div>
            <div className="sidebar-item">
                <FaClock className="icon" />
                <div className="sidebar-text">
                    <span>Okna Czasowe</span>
                    <span className="sidebar-description">Przejdź do widoku okien czasowych</span>
                </div>
            </div>
            <hr className="separator"></hr>
            <div className="sidebar-item">
                <FaClipboard className="icon" />
                <div className="sidebar-text">
                    <span>Zlecenia</span>
                    <span className="sidebar-description">Przejdź do widoku zleceń</span>
                </div>
            </div>
            <div className="sidebar-item">
                <FaUsers className="icon" />
                <div className="sidebar-text">
                    <span>Współpracownicy</span>
                    <span className="sidebar-description">Przejdź do widoku współpracowników</span>
                </div>
            </div>
            <hr className="separator"></hr>
            <div className="sidebar-item">
                <FaChartLine className="icon" />
                <div className="sidebar-text">
                    <span>Statystyki</span>
                    <span className="sidebar-description">Wyświetl statystyki</span>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CommercialSidebar;
