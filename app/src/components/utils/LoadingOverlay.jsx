import React, { useState, useEffect } from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay = ({ isLoading }) => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        let timeout;

        if (isLoading) {
            timeout = setTimeout(() => setShouldShow(true), 300);
        } else {
            setShouldShow(false);
        }

        return () => clearTimeout(timeout);
    }, [isLoading]);

    if (!shouldShow) return null;

    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Ładowanie danych...</p>
        </div>
    );
};

export default LoadingOverlay;
