import React, { useState } from 'react';
import styles from './ShowOrderDetails.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import TimeSlotsTimeline from '../../utils/TimeSlotsTimeline.jsx';
import ConfirmModal from '../../utils/ConfirmModal';

const ShowDeviceDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    order,
    setOrder,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState(null);

    const closePanel = () => {
        setIsPanelOpen(false);
        setOrder(null);
    };

    const handleAction = (actionType) => {
        setAction(actionType);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        if (action === 'cancel') {
            console.log('Zlecenie anulowane');
        } else if (action === 'reject') {
            console.log('Zlecenie odrzucone');
        } else if (action === 'accept') {
            console.log('Zlecenie zaakceptowane');
        }
        setIsModalOpen(false);
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
                                    Nazwa browaru: {order.contract_brewery_name}
                                </p>
                                <p>
                                    Właściciel:{' '}
                                    {order.contract_brewery_owner_name}
                                </p>
                                <p>Email: {order.contract_brewery_email}</p>
                                <p>
                                    Numer telefonu:{' '}
                                    {order.contract_brewery_phone_number}
                                </p>
                            </div>
                            <div className={styles.detailBox}>
                                <h3>Informacje</h3>
                                <p>Typ piwa: {order.beer_type}</p>
                                <p>Objętość: {order.beer_volume}L</p>
                                <p>Całkowity koszt: {order.price} zł</p>
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
                        <TimeSlotsTimeline order={order} />
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
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};

export default ShowDeviceDetails;
