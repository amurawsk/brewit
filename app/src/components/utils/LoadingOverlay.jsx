import React from 'react';

import styles from './LoadingOverlay.module.css';

const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Ładowanie danych...</p>
        </div>
    );
};

export default LoadingOverlay;
