import React from 'react';

import styles from './ShowUsers.module.css';

/**
 * ShowUsers - displays users styled list, shows username, created_at
 *
 * If users list is empty, component displays proper info
 * @param users - users list
 */
const ShowUsers = ({ users }) => {
    const getBorderColor = (usernameType) => {
        switch (usernameType) {
            case 'Browar Kontraktowy':
                return '#1E90FF';
            case 'Browar Komercyjny':
                return '#32CD32';
            case 'Spółka Pośrednicząca':
                return '#FFA500';
            default:
                return '#000';
        }
    };

    return (
        <div>
            {users.length === 0 ? (
                <p className={styles.noOrdersMessage}>Brak użytkowników.</p>
            ) : (
                <div className={styles.allCoworkers}>
                    {users.map((person, index) => (
                        <div
                            className={styles.coworker}
                            key={index}
                            style={{
                                borderColor: getBorderColor(
                                    person.username_type
                                ),
                            }}>
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
                                <span className={styles.description}>
                                    Typ konta:
                                    <span className={styles.descriptionValue}>
                                        {' '}
                                        {person.username_type}
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
