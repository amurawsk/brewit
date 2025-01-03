import React from 'react';

import styles from './ShowDevices.module.css';

const ShowDevices = ({ devices, openPanel }) => {
    const removeDevice = (id) => {
        console.log(id);
    }

    return (
        <div className={styles.allDevices}>
            {devices.map((device, index) => (
                <div
                    className={styles.device}
                    key={index}
                    onClick={() => openPanel(device)}>
                    <div className={styles.deviceText}>
                        <span className={styles.deviceTextTitle}>
                            {device.name}
                        </span>
                        <span className={styles.deviceDescription}>
                            typ urządzenia:
                            <span className={styles.deviceDescriptionValue}>
                                {' '}
                                {device.device_type}
                            </span>
                        </span>
                        <span className={styles.deviceDescription}>
                            nr seryjny:
                            <span className={styles.deviceDescriptionValue}>
                                {' '}
                                {device.serial_number}
                            </span>
                        </span>
                    </div>
                    <button
                        className={styles.removeButton}
                        onClick={(event) => {
                            event.stopPropagation();
                            removeDevice(device.id);
                        }}>
                        Usuń
                    </button>
                </div>
            ))}
        </div>
    );
};
export default ShowDevices;
