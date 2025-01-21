import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import styles from './RateModal.module.css';

/**
 * Modal window for providing feedback (positive or negative rating)
 * @param message - displayed message
 * @param onPositive - function executed when positive rating is selected
 * @param onNegative - function executed when negative rating is selected
 * @param onCancel - function executed when cancel button is clicked
 */
const RateModal = ({ message, onPositive, onNegative, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{message}</h3>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={onPositive}
                        className={styles.rateButtonPositive}>
                        <FaThumbsUp className={styles.icon} />
                        Pozytywnie
                    </button>
                    <button
                        onClick={onNegative}
                        className={styles.rateButtonNegative}>
                        <FaThumbsDown className={styles.icon} />
                        Negatywnie
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cofnij
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RateModal;
