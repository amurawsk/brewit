import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Coworkers.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import TimeSlotsDateNavigator from '../../modules/common/TimeSlotsDateNavigator.jsx';
import TimeSlotsTable from '../../modules/common/TimeSlotsTable.jsx';

/**
 * SelectTimeslots page - contains layout (Header, Sidebar, Title, Button)
 */
const SelectTimeslots = () => {
    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');
    const [timeSlots, setTimeSlots] = useState([]);

    const navigate = useNavigate();
    const showSummary = () => navigate('/contract/orders/add/finalize');

    const addTimeSlot = (timeSlotId) => {
        const exists = timeSlots.includes(timeSlotId);
        if (!exists) {
            setTimeSlots((prevTimeSlots) => [...prevTimeSlots, timeSlotId]);
            return true;
        }
        return false;
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
                        text="Dodaj okna czasowe"
                        buttonText="Wyświetl podsumowanie"
                        buttonFunction={showSummary}
                    />
                    {/* TODO filter */}

                    <TimeSlotsDateNavigator
                        view={view}
                        setView={setView}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        startHour={startHour}
                        endHour={endHour}
                        setStartHour={setStartHour}
                        setEndHour={setEndHour}
                    />

                    <TimeSlotsTable
                        view={view}
                        selectedDate={selectedDate}
                        startHour={startHour}
                        endHour={endHour}
                        selectedBreweryId={breweryId}
                        addTimeSlot={addTimeSlot}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectTimeslots;
