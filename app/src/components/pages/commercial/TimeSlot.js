import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import styles from './TimeSlot.module.css'

const CommercialDashboard = () => {
	const navigate = useNavigate();

    const addTimeSlot = () => navigate('/add_time_slot')

    const timetableData = [
        {
            device: 'Tank warzelny #1',
            timeSlots: [
                { id: 1, start: 8, end: 9, status: 'taken' },
                { id: 2, start: 12, end: 13, status: 'available'},
            ],
        },
        {
            device: 'Urządzenie do rozlewania #1',
            timeSlots: [
                { id: 3, start: 10, end: 11, status: 'available' },
                { id: 4, start: 11, end: 12, status: 'available' },
                { id: 5, start: 14, end: 15, status: 'reserved' },
                { id: 6, start: 15, end: 16, status: 'taken' },
            ],
        },
    ];

    const startHour = 8;
    const endHour = 20;

    const hours = Array.from({ length: endHour - startHour }, (_, i) => i + startHour);
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');
    console.log(selectedDate);

    const startOfWeek = (date) => {
        const day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const endOfWeek = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        return endDate;
    };

    const handlePrevDate = () => {
        if (view === 'daily') {
            setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
        } else if (view === 'weekly') {
            const startDate = startOfWeek(new Date(selectedDate));
            setSelectedDate(new Date(startDate.setDate(startDate.getDate() - 7)));
        }
    };

    const handleNextDate = () => {
        if (view === 'daily') {
            setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
        } else if (view === 'weekly') {
            const startDate = startOfWeek(new Date(selectedDate));
            setSelectedDate(new Date(startDate.setDate(startDate.getDate() + 7)));
        }
    };

    const handleToday = () => {
        setSelectedDate(new Date());
    };

    const handleDailyView = () => {
        setView('daily');
    };

    const handleWeeklyView = () => {
        setView('weekly');
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('pl-PL');
    };

    const formatWeekRange = (date) => {
        const startDate = startOfWeek(date);
        const endDate = endOfWeek(startDate);
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

	return (
        <div>
            <DashboardHeader />
			<div className={styles.appContainer}>
				<CommercialSidebar />
				<div className={styles.content}>
                    <div className={styles.tittleButton}>
                        <h1 className={styles.tittle}>Okna czasowe</h1>
                        <button className={styles.addDeviceButton} onClick={addTimeSlot}>Dodaj nowe okno czasowe</button>
                    </div>
                        <div className={styles.dateNavigator}>
                            <button onClick={handlePrevDate}>&lt;</button>
                            <span className={styles.selectedDate}>
                                {view === 'daily' ? formatDate(selectedDate) : formatWeekRange(selectedDate)}
                            </span>
                            <button onClick={handleNextDate}>&gt;</button>
                
                            <div className={styles.spacer}></div>
                
                            <span
                                onClick={handleToday}
                                className={selectedDate.toDateString() === new Date().toDateString() ? styles.active : ''}
                            >
                                Dziś
                            </span>
                
                            <div className={styles.separator}></div>
                
                            <span
                                onClick={handleDailyView}
                                className={view === 'daily' ? styles.active : ''}
                            >
                                Widok dzienny
                            </span>
                            <span
                                onClick={handleWeeklyView}
                                className={view === 'weekly' ? styles.active : ''}
                            >
                                Widok tygodniowy
                            </span>
                    </div>
                    <div className={styles.tableContainer}>
                        <table border="1" className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.tableTh}>Urządzenie</th>
                                    {hours.map((hour) => (
                                        <th key={hour} className={styles.tableTh}>
                                            {hour}:00
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timetableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className={styles.deviceTableTd}>{row.device}</td>
                                        {hours.map((hour) => {
                                            const timeSlot = row.timeSlots.find(
                                                (slot) =>
                                                    slot.start <= hour &&
                                                    slot.end > hour
                                            );

                                            const cellClass =
                                                timeSlot?.status === 'available'
                                                    ? styles.activeAvailableSlot
                                                    : timeSlot?.status === 'reserved'
                                                    ? styles.activeReservedSlot
                                                    : timeSlot?.status === 'taken'
                                                    ? styles.activeTakenSlot
                                                    : styles.defaultSlot;

                                            return (
                                                <td key={hour} className={cellClass}>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>
		</div>
    );
};

export default CommercialDashboard;
