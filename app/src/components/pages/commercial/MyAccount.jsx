import React, { useState, useEffect } from 'react';
import styles from './MyAccount.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import AccountInfo from '../../modules/common/AccountInfo.jsx';

import api from '../../../api.js';

/**
 * Account page - contains layout (Dashboard, Sidebar, Title), displays account details and most important brewery info
 */
const MyAccount = () => {
    const [accountInfo, setAccountInfo] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log();
                const response = await api.get(
                    `accounts/commercial/${parseInt(localStorage.getItem('userId'))}/`
                );
                if (response.status === 200) {
                    setAccountInfo(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching devices:', error);
            }
        };
        getData();
    }, []);

    return (
        <div>
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
                    {accountInfo !== null &&
                        <AccountInfo accountInfo={accountInfo} />
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
