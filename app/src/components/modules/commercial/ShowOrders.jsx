import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import ShowOrderDetails from './ShowOrderDetails';

import styles from './ShowOrders.module.css';

const ShowOrders = ({ orders, status }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const filteredOrders = orders.filter((order) => order.status === status);

    const openPanel = () => {
        setIsPanelOpen(true);
    };

    const handleOrderClicked = (order) => {
        setSelectedOrder(order);
        openPanel();
    };

    return (
        <div>
            {filteredOrders.length === 0 ? (
                <p className={styles.noOrdersMessage}>
                    Brak zleceń o tym statusie.
                </p>
            ) : (
                <div className={styles.grid}>
                    {filteredOrders.map((order, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => handleOrderClicked(order)}>
                            <h2>Zlecenie #{order.id}</h2>
                            <p>
                                Zleceniodawca:{' '}
                                <b>{order.contract_brewery_name}</b>
                            </p>
                            <p>
                                Utworzone dnia:{' '}
                                <b>
                                    {new Date(order.created_at).toLocaleString(
                                        'pl-PL'
                                    )}
                                </b>
                            </p>
                            {order.status === 'P' && (
                                <p>
                                    Data zakończenia:{' '}
                                    <b>
                                        {new Date(
                                            order.ended_at
                                        ).toLocaleString('pl-PL')}
                                    </b>
                                </p>
                            )}
                            {order.status === 'N' && (
                                <p>
                                    Typ piwa: <b>{order.beer_type} L</b>
                                </p>
                            )}
                            {order.status !== 'R' && (
                                <p>
                                    Objętość piwa: <b>{order.beer_volume} L</b>
                                </p>
                            )}
                            {order.status === 'R' && (
                                <p>
                                    Odrzucone dnia:{' '}
                                    <b>
                                        {new Date(
                                            order.ended_at
                                        ).toLocaleString('pl-PL')}
                                    </b>
                                </p>
                            )}

                            {order.status === 'P' && (
                                <p>
                                    Ocena:{' '}
                                    {order.rate === null ? (
                                        <span className={styles.emptyRate}>
                                            <b>brak</b>
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
                        </div>
                    ))}
                </div>
            )}
            <ShowOrderDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                order={selectedOrder}
                setOrder={setSelectedOrder}
            />
        </div>
    );
};

export default ShowOrders;
