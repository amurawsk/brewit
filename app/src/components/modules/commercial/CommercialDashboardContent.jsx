import React, { useEffect, useState } from 'react';
import styles from './CommercialDashboardContent.module.css';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../utils/PageTitle';
import ShowOrderDetails from './ShowOrderDetails';

import api from '../../../api.js';

/**
 * CommercialDashboardContent - defines what is displayed to commercial_brewery user on dashboard page, currently it displays 3 (or less) new orders and 3 (or less) current orders
 */
const CommercialDashboardContent = () => {
    const navigate = useNavigate();
    const addDevice = () => navigate('/commercial/devices/add');
    const addTimeSlot = () => navigate('/commercial/time_slots/add');
    const addCoworker = () => navigate('/commercial/coworkers/add');
    const goToOrders = () => navigate('/commercial/orders');

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [newOrders, setNewOrders] = useState(null);
    const [currentOrders, setCurrentOrders] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`orders/commercial/dashboard/`);
                if (response.status === 200) {
                    setNewOrders(response.data.new_orders);
                    setCurrentOrders(response.data.confirmed_orders);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };
        getData();
    }, []);

    const handleOrderClicked = (order) => {
        setSelectedOrder(order);
        setIsPanelOpen(true);
    };

    const viewAllNewOrders = () => {
        navigate('/commercial/orders', {
            state: { orderType: 'N' },
        });
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.TitleButtonContainer}>
                <PageTitle text="Szybki dostęp" />
                <div className={styles.actionBar}>
                    <button
                        className={styles.darkButton}
                        onClick={() => addDevice()}>
                        Dodaj urządzenie
                    </button>
                    <button
                        className={styles.darkButton}
                        onClick={() => addTimeSlot()}>
                        Dodaj okno czasowe
                    </button>
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
                                        Zleceniodawca:{' '}
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
                                        Zleceniodawca:{' '}
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

export default CommercialDashboardContent;
