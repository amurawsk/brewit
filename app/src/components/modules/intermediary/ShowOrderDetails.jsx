import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import TimeSlotsTimeline from '../common/TimeSlotsTimeline.jsx';

import styles from './ShowOrderDetails.module.css';

const ShowOrderDetails = ({ isPanelOpen, setIsPanelOpen, order, setOrder }) => {
    const closePanel = () => {
        setIsPanelOpen(false);
        setOrder(null);
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
                                <p>
                                    Email:{' '}
                                    {order.contract_brewery.contract_email}
                                </p>
                                <p>
                                    Numer telefonu:{' '}
                                    {
                                        order.contract_brewery
                                            .contract_phone_number
                                    }
                                </p>
                            </div>
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
                                <h3>Dodatkowe informacje</h3>
                                <p>Typ piwa: {order.beer_type}</p>
                                <p>Objętość: {order.beer_volume}L</p>
                                <p>Całkowity koszt: {order.total_price} zł</p>
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

export default ShowOrderDetails;
