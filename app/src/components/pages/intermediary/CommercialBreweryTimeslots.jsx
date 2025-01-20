import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import TimeSlotsDateNavigator from '../../modules/common/TimeSlotsDateNavigator.jsx';
import TimeSlotsTable from '../../modules/common/TimeSlotsTable.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './CommercialBreweryTimeslots.module.css';

const CommercialBreweryTimeslots = () => {
    const location = useLocation();
    const breweryId = location.state?.breweryId || null;

    const navigate = useNavigate();

    const goToDetails = () => {
        navigate('/intermediary/commercial-breweries/brewery-details', {
            state: { breweryId: breweryId },
        });
    };

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');

    useEffect(() => {
        if (breweryId === null) {
            navigate('/intermediary/commercial-breweries')
        }
    }, [breweryId, navigate])

    if (breweryId === null) {
        return null;
    }

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
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() => goToDetails()}
                            className={styles.backButton}
                        >
                            Cofnij
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommercialBreweryTimeslots;
