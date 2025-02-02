import React, { useState } from 'react';

import ConfirmModal from '../../utils/ConfirmModal';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ShowCoworkers.module.css';

import api from '../../../api.js';

/**
 * ShowCoworkers - displays coworkers styled list, shows username, created_at
 *
 * If coworkers list is empty, component displays proper info
 * @param coworkers - coworkers list
 */
const ShowCoworkers = ({ coworkers, isModalOpen, setIsModalOpen }) => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const closePanel = () => {
        setIsModalOpen(false);
        setUserId(null);
    };

    const handleAction = (id) => {
        setUserId(id);
        setIsModalOpen(true);
    };

    const confirmAction = async () => {
        setIsLoading(true);
        try {
            const response = await api.post(`coworkers/remove/`, {
                coworker_id: userId,
            });
            if (response.status === 200) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                alert(
                    'Błąd podczas dodawania pracownika! Odśwież stronę i spróbuj ponownie'
                );
            }
        } catch (error) {
            setIsLoading(false);
            alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
        }
        closePanel();
    };

    const cancelAction = () => {
        closePanel();
    };

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
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
