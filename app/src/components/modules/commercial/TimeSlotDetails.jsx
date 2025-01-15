import React, { useState, useEffect } from 'react';

import ConfirmModal from '../../utils/ConfirmModal';
import ChangePriceModal from '../../utils/ChangePriceModal';
import Notification from '../../utils/Notification.jsx';

import styles from './TimeSlotDetails.module.css';

import api from '../../../api.js';

/**
 * ShowTimeSlotDetails - pop-up which is visible after clicking on chosen timeslot, displays all timeslot details, allows to change price / cancel timeslot
 * @param isPanelOpen - defines if panel is visible
 * @param setIsPanelOpen - setter for isPanelOpen
 * @param selectedSlot - timeslot which was selected by user
 * @param selectedDevice - device which was selected by user
 */
const TimeSlotDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    selectedSlot,
    selectedDevice,
    refreshData,
}) => {
    const [contractBrewery, setContractBrewery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setNotificationText] = useState(null);

    const truncateDeviceName = (name) => {
        if (name && name.length > 25) {
            return name.slice(0, 25) + '...';
        }
        return name;
    };

    const showNotification = (text) => {
        setNotificationText(text);
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    useEffect(() => {
        if (selectedSlot && selectedSlot.order !== null) {
            setContractBrewery({
                name: 'Mock browar 1',
                owners_name: 'Jan Kowalski',
                email: 'example@gmail.com',
                phone_number: '123456789',
            });
        } else {
            setContractBrewery(null);
        }
    }, [selectedSlot]);

    const deleteTimeSlot = async () => {
        try {
            const response = await api.get(`time-slots/delete/${selectedSlot.id}/`);
            console.log(response)
            if (response.status === 200) {
                if (refreshData) {
                    refreshData();
                    showNotification('Pomyślnie usunięto!');
                }
            } else {
                showNotification('Wystąpił błąd!');
                console.log(response)
            }
        } catch (error) {
            showNotification('Wystąpił błąd!');
            console.log(error);
        } finally {
            setIsModalOpen(false);
            setIsPanelOpen(false);
        }
    };

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    const handleChangePrice = async (newPrice) => {
        try {
            const payload = {
                time_slot_id: selectedSlot.id,
                new_price: newPrice,
            };
            const response = await api.post('time-slots/edit/price/', payload);

            if (response.status === 200) {
                if (refreshData) {
                    refreshData();
                    showNotification('Pomyślnie zmieniono cenę!');
                }
            } else {
                showNotification('Wystąpił błąd!');
            }
        } catch (error) {
            showNotification('Wystąpił błąd!');
            console.log(error);
        } finally {
            setIsPriceDialogOpen(false);
            setIsPanelOpen(false);
        }
    };

    const handleCancel = () => {
        setIsPriceDialogOpen(false);
    };

    return (
        <div>
            {isPanelOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <div className={styles.left}>
                                {truncateDeviceName(selectedDevice.name)}
                            </div>
                            <div className={styles.right}>
                                Status:{' '}
                                {selectedSlot.status === 'F' ? (
                                    <span className={styles.available}>
                                        Dostępne
                                    </span>
                                ) : selectedSlot.status === 'R' ? (
                                    <span className={styles.reserved}>
                                        Zarezerwowane
                                    </span>
                                ) : selectedSlot.status === 'H' ? (
                                    <span className={styles.taken}>Zajęte</span>
                                ) : (
                                    'Nieznany status'
                                )}
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.detailBox}>
                                <h3>Informacje</h3>
                                <p>
                                    <strong>Start:</strong>{' '}
                                    {new Date(
                                        selectedSlot.start_timestamp
                                    ).toLocaleString('pl-PL')}
                                </p>
                                <p>
                                    <strong>Koniec:</strong>{' '}
                                    {new Date(
                                        selectedSlot.end_timestamp
                                    ).toLocaleString('pl-PL')}
                                </p>
                                <p>
                                    <strong>Cena:</strong> {selectedSlot.price}{' '}
                                    zł
                                </p>
                            </div>
                            <div className={styles.detailBox}>
                                <h3>Zlecenie</h3>
                                {contractBrewery ? (
                                    <>
                                        <p>
                                            <strong>Numer zlecenia:</strong>{' '}
                                            Zlecenie #{selectedSlot.order}
                                        </p>
                                    </>
                                ) : (
                                    <p>
                                        To okno czasowe nie jest przypisane do
                                        żadnego zlecenia
                                    </p>
                                )}
                            </div>
                            <div className={styles.detailBox}>
                                <h3>Browar kontraktowy</h3>
                                {contractBrewery ? (
                                    <>
                                        <p>
                                            <strong>Nazwa browaru:</strong>{' '}
                                            {contractBrewery.name}
                                        </p>
                                        <p>
                                            <strong>Właściciel:</strong>{' '}
                                            {contractBrewery.owners_name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{' '}
                                            {contractBrewery.email}
                                        </p>
                                        <p>
                                            <strong>Telefon:</strong>{' '}
                                            {contractBrewery.phone_number}
                                        </p>
                                    </>
                                ) : (
                                    <p>
                                        To okno czasowe nie jest zarezerwowane /
                                        zajęte przez żaden browar kontraktowy
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.newOrderButtonGroup}>
                            {Date.now() <
                                new Date(selectedSlot.end_timestamp) && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className={styles.deleteButton}>
                                    Usuń okno czasowe
                                </button>
                            )}
                            {!selectedSlot.order &&
                                Date.now() <
                                    new Date(selectedSlot.start_timestamp) && (
                                    <button
                                        onClick={() =>
                                            setIsPriceDialogOpen(true)
                                        }
                                        className={styles.changePriceButton}>
                                        Zmień cenę
                                    </button>
                                )}
                            <button
                                onClick={() => setIsPanelOpen(false)}
                                className={styles.backButton}>
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć to okno czasowe?"
                    description="Jeśli jest ono zajęte lub zarezerwowane najpierw anuluj / odrzuć przypisane zlecenie"
                    onConfirm={deleteTimeSlot}
                    onCancel={cancelAction}
                />
            )}
            {isPriceDialogOpen && (
                <ChangePriceModal
                    onConfirm={handleChangePrice}
                    onCancel={handleCancel}
                />
            )}
            <Notification
                message={notificationText}
                isVisible={isNotificationVisible}
            />
        </div>
    );
};

export default TimeSlotDetails;
