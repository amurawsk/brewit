import React, { useState, useEffect } from 'react';

import TimeSlotDetails from './TimeSlotDetails';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './TimeSlotsTable.module.css';

import api from '../../../api.js';

/**
 * TimeSlotsTable - main component displaying table with timeslots, table looks different for 'hour' and 'day' view
 * @param view - 'daily' or 'weekly' view
 * @param selectedDate - current chosen date (by user)
 * @param startHour - for 'hour' view user can determine timetable start hour
 * @param endHour - for 'hour' view user can determine timetable end hour
 */
const TimeSlotsTable = ({
    view,
    selectedDate,
    startHour,
    endHour,
    selectedBreweryId,
    addTimeSlot,
    removeTimeSlot,
    isCurrentlyAdded,
}) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [timetableData, setTimetableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const hours = Array.from(
        { length: endHour - startHour },
        (_, i) => i + startHour
    );

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const breweryId = localStorage.getItem('breweryId');
                const response = await api.get(
                    `devices/brewery/${breweryId}/with-time-slots/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setTimetableData(response.data);
                } else {
                    setIsLoading(false);
                    alert('Błąd podczas pobierania okien czasowych! Odśwież stronę i spróbuj ponownie.');
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };

        if (
            !isPanelOpen &&
            localStorage.getItem('userType') === 'commercial_brewery'
        ) {
            getData();
        }
    }, [isPanelOpen]);

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            try {
                const response = await api.get(
                    `devices/brewery/${selectedBreweryId}/with-time-slots/free/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setTimetableData(response.data);
                } else {
                    setIsLoading(false);
                    alert('Błąd podczas pobierania okien czasowych! Odśwież stronę i spróbuj ponownie.');
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };

        if (localStorage.getItem('userType') === 'contract_brewery') {
            getData();
        }
    }, [selectedBreweryId]);

    const formatDate = (date) => {
        return date.toLocaleDateString('pl-PL');
    };

    const startOfWeek = (date) => {
        const day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

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

    const renderTimeSlots = (timeSlots, hour, currentDay) => {
        if (view === 'daily') {
            return timeSlots.find((slot) => {
                const slotStart = new Date(slot.start_timestamp);
                const selectedDay = currentDay.toDateString();
                const slotDay = slotStart.toDateString();
                return slotStart.getHours() === hour && selectedDay === slotDay;
            });
        }

        if (view === 'weekly') {
            return timeSlots.find((slot) => {
                const slotStart = new Date(slot.start_timestamp);
                const selectedDay = currentDay.toDateString();
                const slotDay = slotStart.toDateString();

                return selectedDay === slotDay;
            });
        }

        return null;
    };

    const handleSlotClick = (slot, row) => {
        if (slot) {
            setSelectedSlot(slot);
            setSelectedDevice(row);
            setIsPanelOpen(true);
        }
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

    const getCellClass = (timeSlot) => {
        if (isCurrentlyAdded && isCurrentlyAdded(timeSlot?.id))
            return styles.currentlyAdded;
        switch (timeSlot?.status) {
            case 'F':
                return styles.activeAvailableSlot;
            case 'R':
                return styles.activeReservedSlot;
            case 'H':
                return styles.activeTakenSlot;
            default:
                return styles.defaultSlot;
        }
    };

    return (
        <div className={styles.tableContainer}>
            <LoadingOverlay isLoading={isLoading} />
            <div className={styles.scrollableTable}>
                <table border="1" className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableTh}>Urządzenie</th>
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
                                              const timeSlot = renderTimeSlots(
                                                  row.timeSlots,
                                                  hour,
                                                  selectedDate
                                              );
                                              const cellClass =
                                                  getCellClass(timeSlot);

                                              return (
                                                  <td
                                                      key={hour}
                                                      className={cellClass}
                                                      onClick={() =>
                                                          handleSlotClick(
                                                              timeSlot,
                                                              row
                                                          )
                                                      }></td>
                                              );
                                          })
                                    : Array.from({ length: 7 }, (_, i) => {
                                          const day = new Date(
                                              startOfWeek(selectedDate)
                                          );
                                          day.setDate(day.getDate() + i);
                                          const timeSlot = renderTimeSlots(
                                              row.timeSlots,
                                              null,
                                              day
                                          );
                                          const cellClass =
                                              getCellClass(timeSlot);

                                          return (
                                              <td
                                                  key={i}
                                                  className={cellClass}
                                                  onClick={() =>
                                                      handleSlotClick(
                                                          timeSlot,
                                                          row
                                                      )
                                                  }></td>
                                          );
                                      })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TimeSlotDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                selectedSlot={selectedSlot}
                selectedDevice={selectedDevice}
                addTimeSlot={addTimeSlot}
                removeTimeSlot={removeTimeSlot}
                isCurrentlyAdded={isCurrentlyAdded}
            />
        </div>
    );
};
export default TimeSlotsTable;
