import React from 'react';

import styles from './ShowUsers.module.css';

/**
 * ShowUsers - displays users styled list, shows username, created_at
 *
 * If users list is empty, component displays proper info
 * @param users - users list
 */
const ShowUsers = ({ users }) => {
    return (
        <div>
            {users.length === 0 ? (
                <p className={styles.noOrdersMessage}>Brak użytkowników.</p>
            ) : (
                <div className={styles.allCoworkers}>
                    {users.map((person, index) => (
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ShowUsers;
