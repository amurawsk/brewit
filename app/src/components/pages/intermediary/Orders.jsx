import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import OrderTypes from '../../modules/common/OrderTypes.jsx';
import ShowOrders from '../../modules/intermediary/ShowOrders.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './Orders.module.css';

import api from '../../../api.js';

const Orders = () => {
    const location = useLocation();
    const status = location.state?.orderType || 'C';
    const [activeStatus, setActiveStatus] = useState(status);
    const [orders, setOrders] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async (activeStatus) => {
        setIsLoading(true);
        try {
            const response = await api.get(
                `orders/intermediary/status/${activeStatus}/`
            );
            if (response.status === 200) {
                setIsLoading(false);
                setOrders(response.data);
            } else {
                setIsLoading(false);
                alert(
                    'Błąd podczas pobierania zleceń! Odśwież stronę i spróbuj ponownie.'
                );
            }
        } catch (error) {
            setIsLoading(false);
            alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
        }
    };

    useEffect(() => {
        getData(activeStatus);
    }, [activeStatus]);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
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
                        activeStatus={activeStatus}
                        getData={getData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Orders;
