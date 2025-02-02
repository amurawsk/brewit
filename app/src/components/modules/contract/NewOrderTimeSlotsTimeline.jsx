import React from 'react';

import styles from './NewOrderTimeSlotsTimeline.module.css';

/**
 * NewOrderTimeSlotsTimeline - displays all timeslots in aesthetic way (as a timeline)
 * @param timeSlots - chosen order timeSlots
 */
const NewOrderTimeSlotsTimeline = ({ timeSlots }) => {
    const sortedTimeSlots = [...timeSlots].sort(
        (a, b) => new Date(a.startTimestamp) - new Date(b.startTimestamp)
    );

    return (
        <div className={styles.timeline}>
            {sortedTimeSlots.map((timeslot, index) => (
                <div key={index} className={styles.event}>
                    <div className={`${styles.dot} ${styles.upcoming}`} />
                    <div className={styles.details}>
                        <div className={styles.status}>
                            {timeslot.deviceName}
                        </div>
                        <div className={styles.time}>
                            {new Date(timeslot.startTimestamp).toLocaleString(
                                'pl-PL'
                            )}{' '}
                            -{' '}
                            {new Date(timeslot.endTimestamp).toLocaleString(
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

export default NewOrderTimeSlotsTimeline;
