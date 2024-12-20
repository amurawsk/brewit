import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import TimeSlotsDateNavigator from '../../modules/commercial/TimeSlotsDateNavigator.jsx';
import styles from './TimeSlot.module.css';

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



    const startOfWeek = (date) => {
        const day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };


    




    const formatDate = (date) => {
        return date.toLocaleDateString('pl-PL');
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
