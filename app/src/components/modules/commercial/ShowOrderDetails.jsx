import React from 'react';

import styles from './ShowOrderDetails.module.css';

const ShowDeviceDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    order,
    setOrder
}) => {

    const closePanel = () => {
        setIsPanelOpen(false);
        setOrder(null);
    };
    console.log(order)

    return (
        <div>
            {isPanelOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        
                        <button
                            onClick={closePanel}
                            className={styles.closeButton}>
                            Zamknij
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ShowDeviceDetails;
