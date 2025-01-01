import React from 'react';
import styles from './TimeSlotsTimeline.module.css';

const TimeSlotsTimeline = ({ order }) => {
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
            {order.timeslots.map((timeslot, index) => (
                <div key={index} className={styles.event}>
                    <div
                        className={`${styles.dot} ${getDotColor(timeslot.start_timestamp, timeslot.end_timestamp, order.status)}`}
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
