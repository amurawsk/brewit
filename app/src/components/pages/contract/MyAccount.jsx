import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
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
            setIsLoading(true);
            try {
                const response = await api.get(
                    `accounts/contract/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setAccountInfo(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania szczegółów konta! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, []);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
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
