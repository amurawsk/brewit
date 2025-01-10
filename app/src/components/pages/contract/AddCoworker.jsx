import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

import styles from './AddCoworker.module.css';
import AddCoworkerForm from '../../modules/common/AddCoworkerForm.jsx';

/**
 * Add Coworker page - contains layout (Header, Sidebar, Tittle) and form which allows to add coworker
 */
const AddCoworker = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTittle text="Dodaj współpracownika" />
                    <AddCoworkerForm />
                </div>
            </div>
        </div>
    );
};

export default AddCoworker;
