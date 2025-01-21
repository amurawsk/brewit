import React, { useState } from 'react';

import styles from './ChangePriceModal.module.css';

/**
 * Small pop-up window, enables setting new price
 * @param onConfirm - function executed when 'Confirm' button is clicked
 * @param onCancel - function executed when 'Cancel' button is clicked
 */
const ChangePriceModal = ({ onConfirm, onCancel }) => {
    const [newPrice, setNewPrice] = useState('');

    const handleInputChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPrice) {
            onConfirm(newPrice);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Zmiana ceny</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={handleInputChange}
                        placeholder="Wprowadź nową cenę"
                        className={styles.input}
                        required
                    />
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.confirmButton}>
                            Zatwierdź
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className={styles.cancelButton}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePriceModal;
