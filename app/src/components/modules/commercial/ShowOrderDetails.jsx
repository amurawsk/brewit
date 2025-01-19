import React, { useState } from 'react';
import styles from './ShowOrderDetails.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import TimeSlotsTimeline from '../common/TimeSlotsTimeline.jsx';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';

import api from '../../../api.js';

/**
 * ShowOrderDetails - pop-up window which is visible after clicking on chosen order, displays all order details, allows to accept / reject / cancel order
 * @param isPanelOpen - defines if panel is visible
 * @param setIsPanelOpen - setter for isPanelOpen
 * @param order - chosen order data
 * @param setOrder - setter for order
 */
const ShowOrderDetails = ({ isPanelOpen, setIsPanelOpen, order, setOrder }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [notificationText, setNotificationText] = useState(null);

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

    const acceptOrder = async () => {
        try {
            const response = await api.get(`orders/${order.id}/accept/`);
            console.log(response);
            if (response.status === 200) {
                showNotification('Pomyślnie zaakceptowano!');
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                showNotification('Zamówienie nie mogło zostać zaakceptowane!');
                console.log(response);
            }
        } catch (error) {
            showNotification('Wystąpił błąd!');
            console.log(error);
        }
    };

    const rejectOrder = async () => {
        try {
            const response = await api.get(`orders/${order.id}/reject/`);
            console.log(response);
            if (response.status === 200) {
                showNotification('Pomyślnie odrzucono!');
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                showNotification('Zamówienie nie mogło zostać odrzucone!');
                console.log(response);
            }
        } catch (error) {
            showNotification('Wystąpił błąd!');
            console.log(error);
        }
    };

    const cancelOrder = async () => {
        try {
            const response = await api.get(`orders/${order.id}/cancel/`);
            console.log(response);
            if (response.status === 200) {
                showNotification('Pomyślnie anulowano!');
                setIsModalOpen(false);
                setIsPanelOpen(false);
            } else {
                showNotification('Zamówienie nie mogło być anulowane!');
                console.log(response);
            }
        } catch (error) {
            showNotification('Wystąpił błąd!');
            console.log(error);
        }
    };

    const confirmAction = () => {
        if (action === 'cancel') {
            cancelOrder();
        } else if (action === 'reject') {
            rejectOrder();
        } else if (action === 'accept') {
            acceptOrder();
        }
        setIsModalOpen(false);
        closePanel();
        showNotification();
    };

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
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
                                <h3>Zleceniodawca</h3>
                                <p>
                                    Nazwa browaru: {order.contract_brewery.name}
                                </p>
                                <p>
                                    Właściciel:{' '}
                                    {order.contract_brewery.owner_name}
                                </p>
                                <p>Email: {order.contract_brewery.contract_email}</p>
                                <p>
                                    Numer telefonu:{' '}
                                    {order.contract_brewery.contract_phone_number}
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
                        {order.status !== 'N' && order.status !== 'C' && (
                            <button
                                onClick={closePanel}
                                className={styles.closeButton}>
                                Zamknij
                            </button>
                        )}
                        {order.status === 'N' && (
                            <div className={styles.newOrderButtonGroup}>
                                <button
                                    onClick={closePanel}
                                    className={styles.backButton}>
                                    Zamknij
                                </button>
                                <button
                                    onClick={() => handleAction('reject')}
                                    className={styles.rejectButton}>
                                    Odrzuć
                                </button>
                                <button
                                    onClick={() => handleAction('accept')}
                                    className={styles.acceptButton}>
                                    Przyjmij
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
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ConfirmModal
                    message={
                        action === 'cancel'
                            ? 'Czy na pewno chcesz anulować to zlecenie?'
                            : action === 'reject'
                              ? 'Czy na pewno chcesz odrzucić to zlecenie?'
                              : 'Czy na pewno chcesz zaakceptować to zlecenie?'
                    }
                    description={
                        action === 'cancel'
                            ? 'Spowoduje to natychmiastowe zamknięcie zlecenia, używaj tylko w przypadku awarii. Tej czynności nie da się cofnąć!'
                            : action === 'reject'
                              ? 'Spowoduje to, że status zlecenia zostanie zmieniony na odrzucony. Tej czynności nie da się cofnąć!'
                              : 'Spowoduje to zmianę statusu zlecenia na aktywne, co oznacza przyjęcie zlecenia. Tej czynności nie da się cofnąć!'
                    }
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

export default ShowOrderDetails;
