import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, isVisible }) => {
    if (!isVisible) return null;

    return <div className={styles.notification}>{message}</div>;
};

export default Notification;
