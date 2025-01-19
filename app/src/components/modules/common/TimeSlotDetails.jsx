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
 * @param addTimeSlot
 */
const TimeSlotDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    selectedSlot,
    selectedDevice,
    addTimeSlot,
    removeTimeSlot,
    isCurrentlyAdded,
}) => {
    const [contractBrewery, setContractBrewery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setNotificationText] = useState(null);
    const [deviceDetails, setDeviceDetails] = useState(null);

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
        const getData = async () => {
            try {
                const response = await api.get(
                    `orders/${selectedSlot.order}/contract-brewery/details/`
                );
                console.log(response);
                if (response.status === 200) {
                    setContractBrewery(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedSlot && selectedSlot.order !== null) {
            getData();
        } else {
            setContractBrewery(null);
        }
    }, [selectedSlot]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    `devices/${selectedDevice.id}/details/`
                );
                console.log(response);
                if (response.status === 200) {
                    setDeviceDetails(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (selectedDevice !== null) {
            getData();
        }
    }, [selectedDevice]);

    const resolveDeviceType = (type) => {
        if (type === 'BT') return 'Tank warzelny';
        if (type === 'BE') return 'Urządzenie do rozlewania';
        if (type === 'FT') return 'Pojemnik fermentacyjny';
        if (type === 'AC') return 'Kocioł do leżakowania';
    };

    const resolveSourBeers = (sourBeers) => {
        if (sourBeers) return 'TAK';
        else return 'NIE';
    };

    const deleteTimeSlot = async () => {
        try {
            const response = await api.get(
                `time-slots/delete/${selectedSlot.id}/`
            );
            console.log(response);
            if (response.status === 200) {
                showNotification('Pomyślnie usunięto!');
            } else {
                showNotification('Wystąpił błąd!');
                console.log(response);
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
                showNotification('Pomyślnie zmieniono cenę!');
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

    const handleAddTimeSlot = () => {
        if (
            addTimeSlot(
                selectedSlot.id,
                selectedDevice.name,
                selectedSlot.start_timestamp,
                selectedSlot.end_timestamp
            )
        ) {
            showNotification('Pomyślnie dodano!');
        } else {
            showNotification('To okno czasowe jest już dodane!');
        }
        setIsPanelOpen(false);
    };

    const handleRemoveTimeSlot = () => {
        if (removeTimeSlot(selectedSlot.id)) {
            showNotification('Pomyślnie usunięto!');
        } else {
            showNotification('To okno czasowe nie jest dodane!');
        }
        setIsPanelOpen(false);
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
                            {localStorage.getItem('userType') ===
                                'commercial_brewery' && (
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
                                            To okno czasowe nie jest przypisane
                                            do żadnego zlecenia
                                        </p>
                                    )}
                                </div>
                            )}
                            {localStorage.getItem('userType') ===
                                'commercial_brewery' && (
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
                                                {contractBrewery.owner_name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{' '}
                                                {contractBrewery.contract_email}
                                            </p>
                                            <p>
                                                <strong>Telefon:</strong>{' '}
                                                {
                                                    contractBrewery.contract_phone_number
                                                }
                                            </p>
                                        </>
                                    ) : (
                                        <p>
                                            To okno czasowe nie jest
                                            zarezerwowane / zajęte przez żaden
                                            browar kontraktowy
                                        </p>
                                    )}
                                </div>
                            )}
                            {localStorage.getItem('userType') ===
                                'contract_brewery' &&
                                deviceDetails && (
                                    <div className={styles.detailBox}>
                                        <h3>Szczegóły urządzenia</h3>
                                        <p>
                                            <strong>Nazwa urządzenia:</strong>{' '}
                                            {deviceDetails.name}
                                        </p>
                                        <p>
                                            <strong>Typ urządzenia:</strong>{' '}
                                            {resolveDeviceType(
                                                deviceDetails.device_type
                                            )}
                                        </p>
                                        {deviceDetails.device_type !== 'BE' && (
                                            <p>
                                                <strong>Pojemność:</strong>{' '}
                                                {deviceDetails.capacity} {'(L)'}
                                            </p>
                                        )}
                                        {deviceDetails.device_type !== 'BE' && (
                                            <p>
                                                <strong>
                                                    Temperatura minimalna:
                                                </strong>{' '}
                                                {deviceDetails.temperature_min}{' '}
                                                {'(℃)'}
                                            </p>
                                        )}
                                        {deviceDetails.device_type !== 'BE' && (
                                            <p>
                                                <strong>
                                                    Temperatura maksymalna:
                                                </strong>{' '}
                                                {deviceDetails.temperature_max}{' '}
                                                {'(℃)'}
                                            </p>
                                        )}
                                        <p>
                                            <strong>
                                                Do obsługi piw kwaśnych:
                                            </strong>{' '}
                                            {resolveSourBeers(
                                                deviceDetails.sour_beers
                                            )}
                                        </p>
                                        {(deviceDetails.device_type === 'AC' ||
                                            deviceDetails.device_type ===
                                                'BE') && (
                                            <p>
                                                <strong>Nagazowywanie:</strong>{' '}
                                                {deviceDetails.carbonation}
                                            </p>
                                        )}
                                        {deviceDetails.device_type === 'BE' && (
                                            <p>
                                                <strong>
                                                    Obsługiwane pojemniki:
                                                </strong>{' '}
                                                {
                                                    deviceDetails.supported_containers
                                                }
                                            </p>
                                        )}
                                    </div>
                                )}
                        </div>
                        {localStorage.getItem('userType') ===
                            'commercial_brewery' && (
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
                                        new Date(
                                            selectedSlot.start_timestamp
                                        ) && (
                                        <button
                                            onClick={() =>
                                                setIsPriceDialogOpen(true)
                                            }
                                            className={
                                                styles.changePriceButton
                                            }>
                                            Zmień cenę
                                        </button>
                                    )}
                                <button
                                    onClick={() => setIsPanelOpen(false)}
                                    className={styles.backButton}>
                                    Zamknij
                                </button>
                            </div>
                        )}
                        {localStorage.getItem('userType') ===
                            'contract_brewery' && (
                            <div className={styles.newOrderButtonGroup}>
                                <button
                                    onClick={() => setIsPanelOpen(false)}
                                    className={styles.backButton}>
                                    Zamknij
                                </button>
                                {!isCurrentlyAdded(selectedSlot.id) &&
                                    Date.now() <
                                        new Date(
                                            selectedSlot.start_timestamp
                                        ) && (
                                        <button
                                            onClick={() => handleAddTimeSlot()}
                                            className={
                                                styles.addToTimeSlotsButton
                                            }>
                                            Dodaj do zlecenia
                                        </button>
                                    )}
                                {isCurrentlyAdded(selectedSlot.id) &&
                                    Date.now() <
                                        new Date(
                                            selectedSlot.start_timestamp
                                        ) && (
                                        <button
                                            onClick={() =>
                                                handleRemoveTimeSlot()
                                            }
                                            className={
                                                styles.deleteFromTimeSlotButton
                                            }>
                                            Usuń ze zlecenia
                                        </button>
                                    )}
                            </div>
                        )}
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
