import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import TimeSlotsDateNavigator from '../../modules/common/TimeSlotsDateNavigator.jsx';
import TimeSlotsTable from '../../modules/common/TimeSlotsTable.jsx';

import styles from './TimeSlots.module.css';

/**
 * TimeSlots page - contains layout (Header, Sidebar, Title, Button), displays date navigator and time slots table
 */
const TimeSlots = () => {
    const navigate = useNavigate();
    const addTimeSlot = () => navigate('/commercial/time_slots/add');

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
                        text="Okna czasowe"
                        buttonText="Dodaj nowe okno czasowe"
                        buttonFunction={addTimeSlot}
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
                    />
                </div>
            </div>
        </div>
    );
};

export default TimeSlots;
