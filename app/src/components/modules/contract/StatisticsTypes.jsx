import React from 'react';
import styles from './StatisticsTypes.module.css';

const StatisticsTypes = ({ activeStatus, setActiveStatus }) => {
    const buttons = [
        ['typy piw w czasie', 'B'],
        ['typy produkowanych piw', 'TB'],
        ['ilość wyprodukowanego piwa', 'QD'],
        ['udane/ nieudane warki', 'R'],
    ];

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button) => (
                <button
                    key={button[1]}
                    className={`${styles.button} ${
                        activeStatus === button[1] ? styles.active : ''
                    }`}
                    onClick={() => setActiveStatus(button[1])}>
                    {button[0]}
                </button>
            ))}
        </div>
    );
};

export default StatisticsTypes;
