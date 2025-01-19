import React, { useState } from 'react';
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
    const navigate = useNavigate();

    const location = useLocation();
    const brewery = location.state?.brewery || null;
    const oldTimeSlots = location.state?.timeSlots || [];

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');
    const [timeSlots, setTimeSlots] = useState(oldTimeSlots);

    const showSummary = () => {
        navigate('/contract/orders/add/finalize', {
            state: { brewery: brewery, timeSlots: timeSlots },
        });
    };

    const addTimeSlot = (
        timeSlotId,
        deviceName,
        startTimestamp,
        endTimestamp
    ) => {
        const exists = timeSlots.some((slot) => slot.timeSlotId === timeSlotId);
        if (!exists) {
            setTimeSlots((prevTimeSlots) => [
                ...prevTimeSlots,
                { timeSlotId, deviceName, startTimestamp, endTimestamp },
            ]);
            return true;
        }
        return false;
    };

    const removeTimeSlot = (timeSlotId) => {
        const exists = timeSlots.some((slot) => slot.timeSlotId === timeSlotId);
        if (exists) {
            setTimeSlots((prevTimeSlots) =>
                prevTimeSlots.filter((slot) => slot.timeSlotId !== timeSlotId)
            );
            return true;
        }
        return false;
    };

    const isCurrentlyAdded = (timeSlotId) => {
        const exists = timeSlots.some((slot) => slot.timeSlotId === timeSlotId);
        if (exists) {
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
                        selectedBreweryId={brewery.id}
                        addTimeSlot={addTimeSlot}
                        removeTimeSlot={removeTimeSlot}
                        isCurrentlyAdded={isCurrentlyAdded}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectTimeslots;
