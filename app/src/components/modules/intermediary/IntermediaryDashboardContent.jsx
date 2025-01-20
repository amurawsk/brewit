import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../utils/PageTitle';
import ShowOrderDetails from '../intermediary/ShowOrderDetails';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './IntermediaryDashboardContent.module.css';

import api from '../../../api.js';

const IntermediaryDashboardContent = () => {
    const navigate = useNavigate();
    const addCoworker = () => navigate('/intermediary/coworkers/add');
    const goToOrders = () => navigate('/intermediary/orders');

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [newOrders, setNewOrders] = useState(null);
    const [currentOrders, setCurrentOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(
                    'orders/intermediary/dashboard/'
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setNewOrders(response.data.new_orders);
                    setCurrentOrders(response.data.confirmed_orders);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania zamówień! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, []);

    const handleOrderClicked = (order) => {
        setSelectedOrder(order);
        setIsPanelOpen(true);
    };

    const viewAllNewOrders = () => {
        navigate('/intermediary/orders', {
            state: { orderType: 'N' },
        });
    };

    return (
        <div className={styles.dashboard}>
            <LoadingOverlay isLoading={isLoading} />
            <div className={styles.TitleButtonContainer}>
                <PageTitle text="Szybki dostęp" />
                <div className={styles.actionBar}>
                    <button
                        className={styles.darkButton}
                        onClick={() => addCoworker()}>
                        Dodaj współpracownika
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h3>Nowe zlecenia</h3>
                    <div className={styles.grid}>
                        {newOrders && newOrders.length > 0 ? (
                            newOrders.map((order, index) => (
                                <div
                                    key={index}
                                    className={styles.card}
                                    onClick={() => handleOrderClicked(order)}>
                                    <h2>Zlecenie #{order.id}</h2>
                                    <p>
                                        Zleceniobiorca:{' '}
                                        <b>{order.contract_brewery_name}</b>
                                    </p>
                                    <p>
                                        Utworzone dnia:{' '}
                                        <b>
                                            {new Date(
                                                order.created_at
                                            ).toLocaleString('pl-PL')}
                                        </b>
                                    </p>
                                    <p>
                                        Typ piwa: <b>{order.beer_type}</b>
                                    </p>
                                    <p>
                                        Objętość piwa:{' '}
                                        <b>{order.beer_volume} L</b>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Brak nowych zleceń do wyświetlenia.</p>
                        )}
                    </div>
                    <span
                        className={styles.viewAll}
                        onClick={() => viewAllNewOrders()}>
                        Wyświetl wszystkie nowe zlecenia...
                    </span>
                </div>

                <div className={styles.section}>
                    <h3>Aktualne zlecenia</h3>
                    <div className={styles.grid}>
                        {currentOrders && currentOrders.length > 0 ? (
                            currentOrders.map((order, index) => (
                                <div
                                    key={index}
                                    className={styles.card}
                                    onClick={() => handleOrderClicked(order)}>
                                    <h2>Zlecenie #{order.id}</h2>
                                    <p>
                                        Zleceniobiorca:{' '}
                                        <b>{order.contract_brewery_name}</b>
                                    </p>
                                    <p>
                                        Utworzone dnia:{' '}
                                        <b>
                                            {new Date(
                                                order.created_at
                                            ).toLocaleString('pl-PL')}
                                        </b>
                                    </p>
                                    <p>
                                        Objętość piwa:{' '}
                                        <b>{order.beer_volume} L</b>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Brak aktualnych zleceń do wyświetlenia.</p>
                        )}
                    </div>
                    <span
                        className={styles.viewAll}
                        onClick={() => goToOrders()}>
                        Wyświetl wszystkie aktualne zlecenia...
                    </span>
                </div>
            </div>
            <ShowOrderDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                order={selectedOrder}
                setOrder={setSelectedOrder}
            />
        </div>
    );
};

export default IntermediaryDashboardContent;