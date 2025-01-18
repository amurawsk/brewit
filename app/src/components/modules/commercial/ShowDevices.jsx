import React, { useState } from 'react';

import styles from './ShowDevices.module.css';

import ConfirmModal from '../../utils/ConfirmModal';

/**
 * ShowDevices - displays all devices as an styled list, displays name, type, serial number
 * @param devices - data, all devices that will be displayed
 * @param openPanel - function which opens panel with device details
 */
const ShowDevices = ({ devices, openPanel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const closePanel = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        console.log(deleteId);
        closePanel();
    };

    const cancelAction = () => {
        closePanel();
    };

    return (
        <div className={styles.container}>
            <div className={styles.allDevices}>
                {devices.map((device, index) => (
                    <div
                        className={`${styles.device} ${styles[device.device_type]}`}
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
                                handleAction(device.id);
                            }}>
                            Usuń
                        </button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć to urządzenie?"
                    description="Spowoduje to usunięcie przypisanych okien czasowych i anulowanie potencjalnych zleceń"
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};
export default ShowDevices;
