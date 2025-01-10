import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

import styles from './AddCoworker.module.css';
import AddCoworkerForm from '../../modules/common/AddCoworkerForm.jsx';

/**
 * Add Coworker page - contains layout (Header, Sidebar, Title) and form which allows to add coworker
 */
const AddCoworker = () => {
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
                    <PageTitle text="Dodaj współpracownika" />
                    <AddCoworkerForm />
                </div>
            </div>
        </div>
    );
};

export default AddCoworker;
