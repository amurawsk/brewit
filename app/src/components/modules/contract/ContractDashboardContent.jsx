import React, { useState } from 'react';
import styles from './ContractDashboardContent.module.css';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../utils/PageTitle';
import ShowOrderDetails from '../commercial/ShowOrderDetails';

const ContractDashboardContent = () => {
    const navigate = useNavigate();
    const addCoworker = () => navigate('/contract/coworkers/add');
    const goToOrders = () => navigate('/contract/orders');
    const addRecipe = () => navigate('/contract/recipes/add');

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleOrderClicked = (order) => {
        setSelectedOrder(order);
        setIsPanelOpen(true);
    };

    const viewAllNewOrders = () => {
        navigate('/commercial/orders', {
            state: { orderType: 'N' },
        });
    };

    // TODO mock
    const newOrders = [
        {
            id: 13,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'GHJ',
            beer_volume: 120,
            status: 'N',
            contract_brewery_name: 'Januszex',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2026-01-04T08:00:00.000Z',
                    end_timestamp: '2026-01-04T10:30:00.000Z',
                    device_name: 'Maszyna Z',
                    device_serial_number: 'SN-005',
                },
            ],
        },
        {
            id: 13,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'GHJ',
            beer_volume: 120,
            status: 'N',
            contract_brewery_name: 'Januszex',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2026-01-04T08:00:00.000Z',
                    end_timestamp: '2026-01-04T10:30:00.000Z',
                    device_name: 'Maszyna Z',
                    device_serial_number: 'SN-005',
                },
            ],
        },
        {
            id: 13,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'GHJ',
            beer_volume: 120,
            status: 'N',
            contract_brewery_name: 'Januszex',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2026-01-04T08:00:00.000Z',
                    end_timestamp: '2026-01-04T10:30:00.000Z',
                    device_name: 'Maszyna Z',
                    device_serial_number: 'SN-005',
                },
            ],
        },
    ];
    const currentOrders = [
        {
            id: 1,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'ABC',
            beer_volume: 120,
            status: 'C',
            contract_brewery_name: 'TwojePiwoPL',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2025-01-01T08:00:00.000Z',
                    end_timestamp: '2025-01-01T10:00:00.000Z',
                    device_name: 'Maszyna A',
                    device_serial_number: 'SN-001',
                },
                {
                    start_timestamp: '2025-01-01T10:30:00.000Z',
                    end_timestamp: '2025-01-01T12:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-01T10:30:00.000Z',
                    end_timestamp: '2025-01-01T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-02T10:30:00.000Z',
                    end_timestamp: '2025-01-02T12:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-03T10:30:00.000Z',
                    end_timestamp: '2025-01-03T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-03-04T10:00:00.000Z',
                    end_timestamp: '2025-03-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
            ],
        },
        {
            id: 2,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'DEF',
            beer_volume: 120,
            status: 'C',
            contract_brewery_name: 'BeerCompany123',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: true,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2025-01-02T09:00:00.000Z',
                    end_timestamp: '2025-03-02T11:00:00.000Z',
                    device_name: 'Maszyna X',
                    device_serial_number: 'SN-003',
                },
            ],
        },
        {
            id: 2,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'DEF',
            beer_volume: 120,
            status: 'C',
            contract_brewery_name: 'BeerCompany123',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: true,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2025-01-02T09:00:00.000Z',
                    end_timestamp: '2025-03-05T11:00:00.000Z',
                    device_name: 'Maszyna X',
                    device_serial_number: 'SN-003',
                },
            ],
        },
    ];

    return (
        <div className={styles.dashboard}>
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
