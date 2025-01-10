import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Orders.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';
import OrderTypes from '../../modules/common/OrderTypes.jsx';
import ShowOrders from '../../modules/contract/ShowOrders.jsx';

/**
 * Orders page - contains layout (Header, Sidebar, Tittle), displays orders (new, current, past, rejected)
 */
const Orders = () => {
    const location = useLocation();
    const status = location.state?.orderType || 'C';
    const [activeStatus, setActiveStatus] = useState(status);

    // TODO mock
    const orders = [
        {
            id: 1,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'ABC',
            beer_volume: 120,
            status: 'C',
            commercial_brewery_name: 'TwojePiwoPL',
            commercial_brewery_nip: '12345678901',
            commercial_brewery_email: 'example@gmail.com',
            commercial_brewery_phone_number: '123456789',
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
            status: 'P',
            commercial_brewery_name: 'BeerCompany123',
            commercial_brewery_nip: '12345678901',
            commercial_brewery_email: 'example@gmail.com',
            commercial_brewery_phone_numer: '123456789',
            rate: true,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-02T09:00:00.000Z',
                    end_timestamp: '2024-01-02T11:00:00.000Z',
                    device_name: 'Maszyna X',
                    device_serial_number: 'SN-003',
                },
            ],
        },
        {
            id: 3,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'DEF',
            beer_volume: 120,
            status: 'P',
            commercial_brewery_name: 'CosTamCosTam',
            commercial_brewery_nip: '12345678901',
            commercial_brewery_email: 'example@gmail.com',
            commercial_brewery_phone_numer: '123456789',
            rate: false,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-03T07:00:00.000Z',
                    end_timestamp: '2024-01-03T09:30:00.000Z',
                    device_name: 'Maszyna Y',
                    device_serial_number: 'SN-004',
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
            commercial_brewery_name: 'Januszex',
            commercial_brewery_nip: '12345678901',
            commercial_brewery_email: 'example@gmail.com',
            commercial_brewery_phone_numer: '123456789',
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
            id: 16,
            created_at: '2024-01-01T09:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'ANDK',
            beer_volume: 120,
            status: 'R',
            commercial_brewery_name: '2137',
            commercial_brewery_nip: '12345678901',
            commercial_brewery_email: 'example@gmail.com',
            commercial_brewery_phone_numer: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-05T10:00:00.000Z',
                    end_timestamp: '2024-01-05T12:00:00.000Z',
                    device_name: 'Maszyna W',
                    device_serial_number: 'SN-006',
                },
                {
                    start_timestamp: '2024-01-05T12:30:00.000Z',
                    end_timestamp: '2024-01-05T14:00:00.000Z',
                    device_name: 'Maszyna V',
                    device_serial_number: 'SN-007',
                },
            ],
        },
    ];

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <div className={styles.tittleButtonContainer}>
                        <PageTittle text="Zlecenia" />
                        <OrderTypes
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                        />
                    </div>
                    <ShowOrders orders={orders} status={activeStatus} />
                </div>
            </div>
        </div>
    );
};

export default Orders;
