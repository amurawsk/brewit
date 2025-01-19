import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Orders.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import OrderTypes from '../../modules/common/OrderTypes.jsx';
import ShowOrders from '../../modules/contract/ShowOrders.jsx';

import api from '../../../api.js';

/**
 * Orders page - contains layout (Header, Sidebar, Title), displays orders (new, current, past, rejected)
 */
const Orders = () => {
    const location = useLocation();
    const status = location.state?.orderType || 'C';
    const [activeStatus, setActiveStatus] = useState(status);
    const [orders, setOrders] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    `orders/contract/status/${activeStatus}/`
                );
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching devices:', error);
            }
        };
        getData();
    }, [activeStatus, isPanelOpen]);

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <div className={styles.TitleButtonContainer}>
                        <PageTitle text="Zlecenia" />
                        <OrderTypes
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                        />
                    </div>
                    <ShowOrders
                        orders={orders}
                        isPanelOpen={isPanelOpen}
                        setIsPanelOpen={setIsPanelOpen}
                    />
                </div>
            </div>
        </div>
    );
};

export default Orders;
