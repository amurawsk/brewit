import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import AccountInfo from '../../modules/common/AccountInfo.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './MyAccount.module.css';

import api from '../../../api.js';

/**
 * Account page - contains layout (Dashboard, Sidebar, Title), displays account details and most important brewery info
 */
const MyAccount = () => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    `accounts/commercial/${parseInt(localStorage.getItem('userId'))}/`
                );
                if (response.status === 200) {
                    setAccountInfo(response.data);
                    setIsLoading(false);
                } else {
                    console.log(response);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Error fetching devices:', error);
                setIsLoading(false);
            }
        };
        setIsLoading(true);
        getData();
    }, []);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <CommercialSidebar />
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <ContractSidebar />
                )}
                <div className={styles.content}>
                    <PageTitle text="Moje konto" />
                    {accountInfo !== null && (
                        <AccountInfo accountInfo={accountInfo} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
