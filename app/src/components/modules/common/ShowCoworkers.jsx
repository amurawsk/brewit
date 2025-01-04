import React, { useState } from 'react';

import styles from './ShowCoworkers.module.css';

import ConfirmModal from '../../utils/ConfirmModal';

const ShowCoworkers = ({ coworkers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(null);

    const closePanel = () => {
        setIsModalOpen(false);
        setUsername(null);
    };

    const handleAction = (username) => {
        setUsername(username);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        // TODO mock
        console.log('Usuwam:', username);
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
                                onClick={() => handleAction(person.username)}>
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