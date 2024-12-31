import React, { useState } from 'react';
import styles from './Orders.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';
import OrderTypes from '../../modules/commercial/OrderTypes.jsx';
import ShowOrders from '../../modules/commercial/ShowOrders.jsx';

const Orders = () => {
    // TODO mock
    const orders = [
        { id: 1, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'ABC', beer_volume: 120, status: 'N', contract_brewery_name: 'TwojePiwoPL', rate: null,  },
        { id: 2, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'DEF', beer_volume: 120, status: 'C', contract_brewery_name: 'BeerCompany123', rate: null,  },
        { id: 3, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'DEF', beer_volume: 120, status: 'C', contract_brewery_name: 'CosTamCosTam', rate: null,  },
        { id: 5, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'DEF', beer_volume: 120, status: 'C', contract_brewery_name: '123123', rate: null,  },
        { id: 13, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'GHJ', beer_volume: 120, status: 'P', contract_brewery_name: 'Januszex', rate: null,  },
        { id: 14, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'GHJ', beer_volume: 120, status: 'P', contract_brewery_name: 'Januszex', rate: true,  },
        { id: 15, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'GHJ', beer_volume: 120, status: 'P', contract_brewery_name: 'Januszex', rate: false,  },
        { id: 16, created_at: "2024-01-01T10:00:00.000Z", ended_at: "2024-01-01T10:00:00.000Z", beer_type: 'ANDK', beer_volume: 120, status: 'R', contract_brewery_name: '2137', rate: null,  },
    ];

    const [activeStatus, setActiveStatus] = useState('C');

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
                <div className={styles.content}>
                <div className={styles.tittleButtonContainer}>
                    <PageTittle text='Zlecenia' />
                    <OrderTypes activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
                </div>
                    <ShowOrders orders={orders} status={activeStatus} />
                </div>
            </div>
        </div>
    );
};

export default Orders;
