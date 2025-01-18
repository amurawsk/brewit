import React from 'react';
import styles from './TimeSlotsTimeline.module.css';

/**
 * TimeSlotsTimeline - displays all timeslots in aesthetic way (as a timeline)
 * @param timeSlots - chosen order timeSlots
 */
const TimeSlotsTimeline = ({ timeSlots, orderStatus }) => {
    const getDotColor = (start, end, status) => {
        const currentTime = new Date().toISOString();
        if (status === 'R') {
            return styles.cancelled;
        }
        if (currentTime < start) {
            return styles.upcoming;
        } else if (currentTime > end) {
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
                            {timeslot.device_name} -{' '}
                            {timeslot.device_serial_number}
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
                        <div className={styles.line} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimeSlotsTimeline;
