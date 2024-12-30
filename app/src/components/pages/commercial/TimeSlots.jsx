import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import TimeSlotsDateNavigator from '../../modules/commercial/TimeSlotsDateNavigator.jsx';
import TimeSlotsTable from '../../modules/commercial/TimeSlotsTable.jsx';

import styles from './TimeSlots.module.css';

import api from '../../../api.js';

const TimeSlots = () => {
    const navigate = useNavigate();
    const addTimeSlot = () => navigate('/commercial/time_slots/add');

    const [timetableData, setTimetableData] = useState([]);
    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');

    const getData = async () => {
        try {
            const breweryId = 1;
            const response = await api.get(
                `devices/brewery/${breweryId}/with-time-slots/`
            );
            if (response.status === 200) {
                setTimetableData(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <PageTittleWithButton
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
                        timetableData={timetableData}
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
