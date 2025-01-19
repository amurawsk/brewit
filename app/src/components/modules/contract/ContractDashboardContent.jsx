import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../utils/PageTitle';
import ShowOrderDetails from '../commercial/ShowOrderDetails';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ContractDashboardContent.module.css';

import api from '../../../api.js';

const ContractDashboardContent = () => {
    const navigate = useNavigate();
    const addCoworker = () => navigate('/contract/coworkers/add');
    const goToOrders = () => navigate('/contract/orders');
    const addRecipe = () => navigate('/contract/recipes/add');

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [newOrders, setNewOrders] = useState(null);
    const [currentOrders, setCurrentOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`orders/contract/dashboard/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setNewOrders(response.data.new_orders);
                    setCurrentOrders(response.data.confirmed_orders);
                } else {
                    setIsLoading(false);
                    alert('Błąd podczas pobierania zamówień! Odśwież stronę i spróbuj ponownie.');
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
        navigate('/contract/orders', {
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
                        onClick={() => addRecipe()}>
                        Dodaj przepis
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
                        {newOrders.map((order, index) => (
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
                                    Objętość piwa: <b>{order.beer_volume} L</b>
                                </p>
                            </div>
                        ))}
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
                        {currentOrders.map((order, index) => (
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
                                    Objętość piwa: <b>{order.beer_volume} L</b>
                                </p>
                            </div>
                        ))}
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

export default ContractDashboardContent;
