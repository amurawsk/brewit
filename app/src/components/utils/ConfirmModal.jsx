import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ message, description, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{message}</h3>
                {description && (
                    <h6 className={styles.description}>{description}</h6>
                )}
                <div className={styles.buttonGroup}>
                    <button
                        onClick={onConfirm}
                        className={styles.confirmButton}>
                        Tak
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cofnij
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
