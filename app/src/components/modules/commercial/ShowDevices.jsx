import React, { useState } from 'react';

import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ShowDevices.module.css';

import api from '../../../api.js';

/**
 * ShowDevices - displays all devices as an styled list, displays name, type, serial number
 * @param devices - data, all devices that will be displayed
 * @param openPanel - function which opens panel with device details
 */
const ShowDevices = ({ devices, openPanel, getData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setNotificationText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showNotification = (text) => {
        setNotificationText(text);
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const closePanel = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        const removeDevice = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`devices/${deleteId}/delete/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    getData();
                } else {
                    setIsLoading(false);
                    showNotification('Nie można usunąć urządzenia!');
                }
            } catch (error) {
                setIsLoading(false);
                showNotification('Nie można usunąć urządzenia!');
            }
        };
        removeDevice();
        closePanel();
    };

    const cancelAction = () => {
        closePanel();
    };

    return (
        <div className={styles.container}>
            <LoadingOverlay isLoading={isLoading} />
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
                    description="Jeśli jakieś okna czasowe dla tego urządzenia są zajęte, to najpierw je anuluj"
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
            <Notification
                message={notificationText}
                isVisible={isNotificationVisible}
            />
        </div>
    );
};
export default ShowDevices;
