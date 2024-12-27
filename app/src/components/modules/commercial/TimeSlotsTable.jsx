import React, { useState } from 'react';
import TimeSlotDetails from './TimeSlotDetails';

import styles from './TimeSlotsTable.module.css';

const TimeSlotsTable = ({
    timetableData,
    view,
    selectedDate,
    startHour,
    endHour,
}) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const hours = Array.from(
        { length: endHour - startHour },
        (_, i) => i + startHour
    );

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

    const handleSlotClick = (slot) => {
        if (slot) {
            setSelectedSlot(slot);
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

    return (
        <div className={styles.tableContainer}>
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
                            <td className={styles.deviceTableTd}>{row.name}</td>
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
                                              timeSlot?.status === 'F'
                                                  ? styles.activeAvailableSlot
                                                  : timeSlot?.status === 'R'
                                                    ? styles.activeReservedSlot
                                                    : timeSlot?.status === 'H'
                                                      ? styles.activeTakenSlot
                                                      : styles.defaultSlot;

                                          return (
                                              <td
                                                  key={hour}
                                                  className={cellClass}
                                                  onClick={() =>
                                                      handleSlotClick(timeSlot)
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
                                          timeSlot?.status === 'F'
                                              ? styles.activeAvailableSlot
                                              : timeSlot?.status === 'R'
                                                ? styles.activeReservedSlot
                                                : timeSlot?.status === 'H'
                                                  ? styles.activeTakenSlot
                                                  : styles.defaultSlot;

                                      return (
                                          <td
                                              key={i}
                                              className={cellClass}
                                              onClick={() =>
                                                  handleSlotClick(timeSlot)
                                              }></td>
                                      );
                                  })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <TimeSlotDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                selectedSlot={selectedSlot}
            />
        </div>
    );
};
export default TimeSlotsTable;
