import React from 'react';

import styles from './TimeSlotsTimeline.module.css';

/**
 * TimeSlotsTimeline - displays all timeslots in aesthetic way (as a timeline)
 * @param timeSlots - chosen order timeSlots
 */
const TimeSlotsTimeline = ({ timeSlots, orderStatus }) => {
    const getDotColor = (start, end, status) => {
        const currentTime = new Date()
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (status === 'R') {
            return styles.cancelled;
        }
        if (currentTime < startDate) {
            return styles.upcoming;
        } else if (currentTime > endDate) {
            return styles.completed;
        } else {
            return styles.inProgress;
        }
    };

    return (
        <div className={styles.timeline}>
            {timeSlots.map((timeslot, index) => (
                <div key={index} className={styles.event}>
                    <div
                        className={`${styles.dot} ${getDotColor(timeslot.start_timestamp, timeslot.end_timestamp, orderStatus)}`}
                    />
                    <div className={styles.details}>
                        <div className={styles.status}>
                            {timeslot.device.name} -{' '}
                            {timeslot.device.serial_number}
                        </div>
                        <div className={styles.time}>
                            {new Date(timeslot.start_timestamp).toLocaleString(
                                'pl-PL'
                            )}{' '}
                            -{' '}
                            {new Date(timeslot.end_timestamp).toLocaleString(
                                'pl-PL'
                            )}
                        </div>
                        <div className={styles.time}>
                            Cena: {timeslot.price} zł
                        </div>
                        <div className={styles.line} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimeSlotsTimeline;
