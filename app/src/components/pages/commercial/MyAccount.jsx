import React from 'react';
import styles from './MyAccount.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from "../../modules/commercial/CommercialSidebar.jsx";
import ContractSidebar from "../../modules/contract/ContractSidebar.jsx";
import PageTittle from '../../utils/PageTittle.jsx';
import AccountInfo from '../../modules/commercial/AccountInfo.jsx';

const MyAccount = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
				{localStorage.getItem('userType') === 'commercial_brewery' && <CommercialSidebar />}
				{localStorage.getItem('userType') === 'contract_brewery' && <ContractSidebar />}
                <div className={styles.content}>
                    <PageTittle text="Moje konto" />
                    <AccountInfo />
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
