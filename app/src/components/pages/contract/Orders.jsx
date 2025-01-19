import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import OrderTypes from '../../modules/common/OrderTypes.jsx';
import ShowOrders from '../../modules/contract/ShowOrders.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './Orders.module.css';

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(
                    `orders/contract/status/${activeStatus}/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setOrders(response.data);
                } else {
                    setIsLoading(false);
                    console.log(response);
                }
            } catch (error) {
                setIsLoading(false);
                console.log('Error fetching devices:', error);
            }
        };
        getData();
    }, [activeStatus, isPanelOpen]);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
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
