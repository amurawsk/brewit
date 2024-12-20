import React from 'react';

import styles from './ShowDevices.module.css';

const ShowDevices = ({ devices, openPanel }) => {
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
                            <span
                                className={
                                    styles.deviceDescriptionValue
                                }>
                                {' '}
                                {device.device_type}
                            </span>
                        </span>
                        <span className={styles.deviceDescription}>
                            nr seryjny:
                            <span
                                className={
                                    styles.deviceDescriptionValue
                                }>
                                {' '}
                                {device.serial_number}
                            </span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ShowDevices;
