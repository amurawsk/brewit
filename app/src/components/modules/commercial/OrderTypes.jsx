import React from 'react';
import styles from './OrderTypes.module.css';

const OrderTypes = ({activeStatus, setActiveStatus}) => {
    const buttons = [['oczekujące', 'N'], ['aktualne', 'C'], ['przeszłe', 'P'], ['odrzucone', 'R']];

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button) => (
                <button
                    key={button[1]}
                    className={`${styles.button} ${
                        activeStatus === button[1] ? styles.active : ''
                    }`}
                    onClick={() => setActiveStatus(button[1])}
                >
                    {button[0]}
                </button>
            ))}
        </div>
    );
};

export default OrderTypes;
