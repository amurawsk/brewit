import React, { useState } from 'react';

import styles from './ShowCoworkers.module.css';

import ConfirmModal from '../../utils/ConfirmModal';

import api from '../../../api.js';

/**
 * ShowCoworkers - displays coworkers styled list, shows username, created_at
 *
 * If coworkers list is empty, component displays proper info
 * @param coworkers - coworkers list
 */
const ShowCoworkers = ({ coworkers, isModalOpen, setIsModalOpen }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    const closePanel = () => {
        setIsModalOpen(false);
        setUserId(null);
    };

    const handleAction = (id) => {
        setUserId(id);
        setIsModalOpen(true);
    };

    const confirmAction = async () => {
        try {
            const response = await api.post(`coworkers/remove/`, {
                coworker_id: userId,
            });
            if (response.status === 200) {
            } else {
                console.error('Error:', response);
                alert('Błąd podczas dodawania pracownika!');
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
            alert('Błąd sieci! Spróbuj ponownie później.');
        }
        closePanel();
    };

    const cancelAction = () => {
        closePanel();
    };

    return (
        <div>
            {coworkers.length === 0 ? (
                <p className={styles.noOrdersMessage}>Brak współpracowników.</p>
            ) : (
                <div className={styles.allCoworkers}>
                    {coworkers.map((person, index) => (
                        <div className={styles.coworker} key={index}>
                            <div className={styles.deviceText}>
                                <span className={styles.textTitle}>
                                    {person.username}
                                </span>
                                <span className={styles.description}>
                                    Konto dodane:
                                    <span className={styles.descriptionValue}>
                                        {' '}
                                        {new Date(
                                            person.added_at
                                        ).toLocaleString('pl-PL')}
                                    </span>
                                </span>
                            </div>
                            <button
                                className={styles.removeButton}
                                onClick={() => handleAction(person.id)}>
                                Usuń
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć tego pracownika?"
                    description="Spowoduje to, że jego konto zostanie usunięte"
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};
export default ShowCoworkers;
