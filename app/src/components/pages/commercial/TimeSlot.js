import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import styles from './TimeSlot.module.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import api from '../../../api.js';

const CommercialDashboard = () => {
    const navigate = useNavigate();

    const addTimeSlot = () => navigate('/add_time_slot');
    const [timetableData, setTimetableData] = useState([]);

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

    const [startHour, setStartHour] = useState(8);
    const [endHour, setEndHour] = useState(16);

    const hours = Array.from(
        { length: endHour - startHour },
        (_, i) => i + startHour
    );

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('daily');

    const handleStartHourChange = (event) => {
        const newStartHour = parseInt(event.target.value, 10);
        if (newStartHour < endHour) {
            setStartHour(newStartHour);
        }
    };

    const handleEndHourChange = (event) => {
        const newEndHour = parseInt(event.target.value, 10);
        if (newEndHour > startHour) {
            setEndHour(newEndHour);
        }
    };

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

    const isTodayActive = () => {
        const today = new Date();
        if (view === 'daily') {
            return selectedDate.toDateString() === today.toDateString();
        }
        if (view === 'weekly') {
            const start = startOfWeek(selectedDate);
            const end = endOfWeek(start);
            return today >= start && today <= end;
        }
        return false;
    };

    const handlePrevDate = () => {
        if (view === 'daily') {
            setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() - 1))
            );
        } else if (view === 'weekly') {
            const startDate = startOfWeek(new Date(selectedDate));
            setSelectedDate(
                new Date(startDate.setDate(startDate.getDate() - 7))
            );
        }
    };

    const handleNextDate = () => {
        if (view === 'daily') {
            setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 1))
            );
        } else if (view === 'weekly') {
            const startDate = startOfWeek(new Date(selectedDate));
            setSelectedDate(
                new Date(startDate.setDate(startDate.getDate() + 7))
            );
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

    const renderTimeSlots = (timeSlots, hour, currentDay) => {
        if (view === 'daily') {
            return timeSlots.find((slot) => {
                const slotStart = new Date(slot.start_timestamp);
                const slotEnd = new Date(slot.end_timestamp);
                const selectedDay = currentDay.toDateString();
                const slotDay = slotStart.toDateString();
                return (
                    slotStart.getHours() <= hour &&
                    slotEnd.getHours() > hour &&
                    selectedDay === slotDay
                );
            });
        }

        if (view === 'weekly') {
            return timeSlots.find((slot) => {
                const slotStart = new Date(slot.start_timestamp);
                // const slotEnd = new Date(slot.end_timestamp);
                const selectedDay = currentDay.toDateString();
                const slotDay = slotStart.toDateString();

                return selectedDay === slotDay;
            });
        }

        return null;
    };

    const filteredTimetableData = timetableData.filter((device) => {
        if (view === 'daily') {
            return device.device_type === 'BT' || device.device_type === 'BE';
        }
        if (view === 'weekly') {
            return device.device_type === 'FT' || device.device_type === 'AC';
        }
        return false;
    });

    const tableHeaders = () => {
        if (view === 'daily') {
            return hours.map((hour) => (
                <th key={hour} className={styles.tableTh}>
                    {hour}:00
                </th>
            ));
        }
        if (view === 'weekly') {
            const startDate = startOfWeek(selectedDate);
            return Array.from({ length: 7 }, (_, i) => {
                const day = new Date(startDate);
                day.setDate(startDate.getDate() + i);
                return (
                    <th key={i} className={styles.tableTh}>
                        {formatDate(day)}
                    </th>
                );
            });
        }
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <div className={styles.tittleButton}>
                        <h1 className={styles.tittle}>Okna czasowe</h1>
                        <button
                            className={styles.addTimeSlotButton}
                            onClick={addTimeSlot}>
                            Dodaj nowe okno czasowe
                        </button>
                    </div>
                    <div className={styles.dateNavigator}>
                        <button
                            className={styles.arrowButton}
                            onClick={handlePrevDate}>
                            <AiOutlineLeft />
                        </button>
                        <span className={styles.selectedDate}>
                            {view === 'daily'
                                ? formatDate(selectedDate)
                                : formatWeekRange(selectedDate)}
                        </span>
                        <button
                            className={styles.arrowButton}
                            onClick={handleNextDate}>
                            <AiOutlineRight />
                        </button>
                        {view === 'daily' && (
                            <div className={styles.hourSelector}>
                                <label className={styles.hourSelectorLabel}>
                                    Od:
                                    <select
                                        className={styles.hourSelectorSelect}
                                        value={startHour}
                                        onChange={handleStartHourChange}>
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i}:00
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className={styles.hourSelectorLabel}>
                                    Do:
                                    <select
                                        className={styles.hourSelectorSelect}
                                        value={endHour}
                                        onChange={handleEndHourChange}>
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i}:00
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}

                        <div className={styles.spacer}></div>
                        <span
                            onClick={handleToday}
                            className={
                                isTodayActive()
                                    ? styles.active
                                    : styles.notActive
                            }>
                            Dziś
                        </span>
                        <div className={styles.separator}></div>
                        <span
                            onClick={handleDailyView}
                            className={
                                view === 'daily'
                                    ? styles.active
                                    : styles.notActive
                            }>
                            Widok dzienny
                        </span>
                        <span
                            onClick={handleWeeklyView}
                            className={
                                view === 'weekly'
                                    ? styles.active
                                    : styles.notActive
                            }>
                            Widok tygodniowy
                        </span>
                    </div>
                    <div className={styles.tableContainer}>
                        <table border="1" className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.tableTh}>
                                        Urządzenie
                                    </th>
                                    {tableHeaders()}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTimetableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className={styles.deviceTableTd}>
                                            {row.name}
                                        </td>
                                        {view === 'daily'
                                            ? hours
                                                  .filter(
                                                      (hour) =>
                                                          hour >= startHour &&
                                                          hour < endHour
                                                  )
                                                  .map((hour) => {
                                                      const timeSlot =
                                                          renderTimeSlots(
                                                              row.timeSlots,
                                                              hour,
                                                              selectedDate
                                                          );
                                                      const cellClass =
                                                          timeSlot?.status ===
                                                          'F'
                                                              ? styles.activeAvailableSlot
                                                              : timeSlot?.status ===
                                                                  'R'
                                                                ? styles.activeReservedSlot
                                                                : timeSlot?.status ===
                                                                    'H'
                                                                  ? styles.activeTakenSlot
                                                                  : styles.defaultSlot;

                                                      return (
                                                          <td
                                                              key={hour}
                                                              className={
                                                                  cellClass
                                                              }></td>
                                                      );
                                                  })
                                            : Array.from(
                                                  { length: 7 },
                                                  (_, i) => {
                                                      const day = new Date(
                                                          startOfWeek(
                                                              selectedDate
                                                          )
                                                      );
                                                      day.setDate(
                                                          day.getDate() + i
                                                      );
                                                      const timeSlot =
                                                          renderTimeSlots(
                                                              row.timeSlots,
                                                              null,
                                                              day
                                                          );
                                                      const cellClass =
                                                          timeSlot?.status ===
                                                          'F'
                                                              ? styles.activeAvailableSlot
                                                              : timeSlot?.status ===
                                                                  'R'
                                                                ? styles.activeReservedSlot
                                                                : timeSlot?.status ===
                                                                    'H'
                                                                  ? styles.activeTakenSlot
                                                                  : styles.defaultSlot;

                                                      return (
                                                          <td
                                                              key={i}
                                                              className={
                                                                  cellClass
                                                              }></td>
                                                      );
                                                  }
                                              )}
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
