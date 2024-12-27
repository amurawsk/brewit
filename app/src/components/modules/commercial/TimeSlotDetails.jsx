import React from 'react';

import styles from './TimeSlotDetails.module.css';

const TimeSlotDetails = ({ isPanelOpen, setIsPanelOpen, selectedSlot }) => {
    const closePanel = () => {
        setIsPanelOpen(false);
    };

    return (
        <div>
            {isPanelOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <h2>Szczegóły okna</h2>
                        {selectedSlot ? (
                            <>
                                <p>
                                    <strong>Status:</strong> {selectedSlot.status}
                                </p>
                                <p>
                                    <strong>Start:</strong> {new Date(selectedSlot.start_timestamp).toLocaleString('pl-PL')}
                                </p>
                                <p>
                                    <strong>Koniec:</strong> {new Date(selectedSlot.end_timestamp).toLocaleString('pl-PL')}
                                </p>
                            </>
                        ) : (
                            <p>Brak danych o oknie.</p>
                        )}
                        <button onClick={closePanel} className={styles.closeButton}>
                            Zamknij
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TimeSlotDetails;
