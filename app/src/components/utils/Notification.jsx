import React from 'react';
import styles from './Notification.module.css';

/**
 * Small pop-up window, shows notification in bottom left corner
 * @param message - displayed notification message
 * @param isVisible - determines whether component is visible
 */
const Notification = ({ message, isVisible }) => {
    if (!isVisible) return null;

    return <div className={styles.notification}>{message}</div>;
};

export default Notification;
