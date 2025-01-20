import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import TimeSlotsDateNavigator from '../../modules/common/TimeSlotsDateNavigator.jsx';
import TimeSlotsTable from '../../modules/common/TimeSlotsTable.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './CommercialBreweryTimeslots.module.css';

const CommercialBreweryTimeslots = () => {
    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <PageTitle text="Okna czasowe" />
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
                    />
                </div>
            </div>
        </div>
    );
};

export default CommercialBreweryTimeslots;
