import React from 'react';

import styles from './ShowCoworkers.module.css';

const ShowCoworkers = ({ coworkers }) => {
    const removeCoworker = (username) => {
        console.log('Usuwam:', username);
    };

    return (
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
    );
};
export default ShowCoworkers;
