import React from 'react';

import styles from './ShowCoworkers.module.css';

const ShowCoworkers = ({ coworkers }) => {
    const removeCoworker = (username) => {
        // TODO mock
        console.log('Usuwam:', username);
    };

    return (
        <div>
            {coworkers.length === 0 ? (
                <p className={styles.noOrdersMessage}>Brak współpracowników.</p>
            ) : (
                <div className={styles.allDevices}>
                    {coworkers.map((person, index) => (
                        <div
                            className={styles.coworker}
                            key={index}>
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
                                onClick={() => removeCoworker(person.username)}
                            >
                                Usuń
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ShowCoworkers;
