import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

import styles from './AddCoworker.module.css';
import AddCoworkerForm from '../../modules/commercial/AddCoworkerForm.jsx';

const AddCoworker = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
				{localStorage.getItem('userType') === 'commercial_brewery' && <CommercialSidebar />}
				{localStorage.getItem('userType') === 'contract_brewery' && <ContractSidebar />}
                <div className={styles.content}>
                    <PageTittle text="Dodaj współpracownika" />
                    <AddCoworkerForm />
                </div>
            </div>
        </div>
    );
};

export default AddCoworker;
