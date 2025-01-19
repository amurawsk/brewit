import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import TimeSlotsTimeline from '../common/TimeSlotsTimeline.jsx';
import ConfirmModal from '../../utils/ConfirmModal';
import RateModal from '../../utils/RateModal.jsx';
import Notification from '../../utils/Notification.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ShowOrderDetails.module.css';

import api from '../../../api.js';

const ShowOrderDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    order,
    setOrder,
    activeStatus,
    getData,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [notificationText, setNotificationText] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showNotification = (text) => {
        setNotificationText(text);
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
        setOrder(null);
    };

    const handleAction = (actionType) => {
        setAction(actionType);
        setIsModalOpen(true);
    };

    const cancelOrder = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`orders/${order.id}/cancel/`);
            if (response.status === 200) {
                setIsLoading(false);
                showNotification('Pomyślnie anulowano!');
                getData(activeStatus);
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                setIsLoading(false);
                getData(activeStatus);
                showNotification('Zamówienie nie mogło być anulowane!');
            }
        } catch (error) {
            setIsLoading(false);
            getData(activeStatus);
            showNotification('Wystąpił błąd!');
        }
    };

    const withdrawOrder = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`orders/${order.id}/withdraw/`);
            if (response.status === 200) {
                setIsLoading(false);
                showNotification('Pomyślnie wycofano!');
                getData(activeStatus);
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                setIsLoading(false);
                showNotification('Zamówienie nie mogło być wycofane!');
                getData(activeStatus);
            }
        } catch (error) {
            setIsLoading(false);
            showNotification('Wystąpił błąd!');
            getData(activeStatus);
        }
    };

    const rateOrder = async (rate) => {
        setIsLoading(true);
        try {
            const response = await api.post(`orders/${order.id}/rate/`, {rate: rate} );
            if (response.status === 200) {
                setIsLoading(false);
                showNotification('Pomyślnie oceniono!');
                getData(activeStatus);
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                setIsLoading(false);
                showNotification('Nie można ocenić!');
                getData(activeStatus);
            }
        } catch (error) {
            setIsLoading(false);
            showNotification('Wystąpił błąd!');
            getData(activeStatus);
        }
    }

    const confirmAction = () => {
        if (action === 'cancel') {
            cancelOrder();
        } else if (action === 'reject') {
            withdrawOrder();
        }
        setIsModalOpen(false);
        closePanel();
        showNotification();
    };

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    const ratePositive = () => {
        rateOrder(true);
        setIsRateModalOpen(false);
        closePanel();
    }

    const rateNegative = () => {
        rateOrder(false);
        setIsRateModalOpen(false);
        closePanel();
    }

    const cancelRate = () => {
        setIsRateModalOpen(false);
    }

    const getRate = () => {
        setIsRateModalOpen(true);
    }

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            {isPanelOpen && order && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <div className={styles.left}>
                                Zlecenie #{order.id}
                            </div>
                            <div className={styles.right}>
                                Status:{' '}
                                {order.status === 'C' ? (
                                    <span className={styles.current}>
                                        Aktualne
                                    </span>
                                ) : order.status === 'N' ? (
                                    <span className={styles.pending}>
                                        Oczekujące
                                    </span>
                                ) : order.status === 'P' ? (
                                    <span className={styles.past}>
                                        Przeszłe
                                    </span>
                                ) : order.status === 'R' ? (
                                    <span className={styles.rejected}>
                                        Odrzucone
                                    </span>
                                ) : (
                                    'Nieznany status'
                                )}
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailBox}>
                                <h3>Zleceniobiorca</h3>
                                <p>
                                    Nazwa browaru:{' '}
                                    {order.commercial_brewery.name}
                                </p>
                                <p>NIP: {order.commercial_brewery.nip}</p>
                                <p>
                                    Email:{' '}
                                    {order.commercial_brewery.contract_email}
                                </p>
                                <p>
                                    Numer telefonu:{' '}
                                    {
                                        order.commercial_brewery
                                            .contract_phone_number
                                    }
                                </p>
                            </div>
                            <div className={styles.detailBox}>
                                <h3>Informacje</h3>
                                <p>Typ piwa: {order.beer_type}</p>
                                <p>Objętość: {order.beer_volume}L</p>
                                <p>Całkowity koszt: {order.total_price} zł</p>
                            </div>
                            <div className={styles.detailBox}>
                                <h3>Dodatkowe informacje</h3>
                                {order.status === 'P' && (
                                    <p>
                                        Ocena:{' '}
                                        {order.rate === null ? (
                                            <span className={styles.emptyRate}>
                                                brak
                                            </span>
                                        ) : order.rate ? (
                                            <FaThumbsUp
                                                className={styles.greenThumb}
                                            />
                                        ) : (
                                            <FaThumbsDown
                                                className={styles.redThumb}
                                            />
                                        )}
                                    </p>
                                )}

                                <p>
                                    Utworzono:{' '}
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </p>
                                {order.status !== 'N' &&
                                    order.status !== 'C' && (
                                        <p>
                                            Zakończono:{' '}
                                            {new Date(
                                                order.ended_at
                                            ).toLocaleDateString()}
                                        </p>
                                    )}
                            </div>
                        </div>
                        <div className={styles.timelineHeader}>
                            <h3>Oś Czasu wynajmowanych urządzeń</h3>
                        </div>
                        <TimeSlotsTimeline
                            timeSlots={order.time_slots}
                            orderStatus={order.status}
                        />
                        {order.status === 'R' && (
                            <button
                                onClick={closePanel}
                                className={styles.closeButton}>
                                Zamknij
                            </button>
                        )}
                        {order.status === 'N' && (
                            <div className={styles.newOrderButtonGroup}>
                                <button
                                    onClick={() => handleAction('reject')}
                                    className={styles.rejectButton}>
                                    Wycofaj
                                </button>
                                <button
                                    onClick={closePanel}
                                    className={styles.backButton}>
                                    Zamknij
                                </button>
                            </div>
                        )}
                        {order.status === 'C' && (
                            <div className={styles.currentOrderButtonGroup}>
                                <button
                                    onClick={() => handleAction('cancel')}
                                    className={styles.cancelButton}>
                                    Anuluj zlecenie
                                </button>
                                <button
                                    onClick={closePanel}
                                    className={styles.okButton}>
                                    Zamknij
                                </button>
                            </div>
                        )}
                        {order.status === 'P' && (
                            <div className={styles.currentOrderButtonGroup}>
                                {order.rate === null && (
                                    <button
                                        onClick={() => getRate()}
                                        className={styles.rateOrderButton}>
                                        Oceń zlecenie
                                    </button>
                                )}
                                <button
                                    onClick={closePanel}
                                    className={styles.okButton}>
                                    Zamknij
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ConfirmModal
                    message={
                        action === 'cancel'
                            ? 'Czy na pewno chcesz anulować to zlecenie?'
                            : 'Czy na pewno chcesz odrzucić to zlecenie?'
                    }
                    description={
                        action === 'cancel'
                            ? 'Spowoduje to natychmiastowe zamknięcie zlecenia, używaj tylko w przypadku wyjątkowych sytuacji. Tej czynności nie da się cofnąć!'
                            : 'Spowoduje to, że status zlecenia zostanie zmieniony na odrzucony. Tej czynności nie da się cofnąć!'
                    }
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
            {isRateModalOpen && (
                <RateModal message="Oceń zlecenie" onPositive={ratePositive} onNegative={rateNegative} onCancel={cancelRate}/>
            )}
            <Notification
                message={notificationText}
                isVisible={isNotificationVisible}
            />
        </div>
    );
};

export default ShowOrderDetails;
