import React from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import AddCoworkerForm from '../../modules/common/AddCoworkerForm.jsx';

import styles from './AddCoworker.module.css';

/**
 * Add Coworker page - contains layout (Header, Sidebar, Title) and form which allows to add coworker
 */
const AddCoworker = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <PageTitle text="Dodaj współpracownika" />
                    <AddCoworkerForm />
                </div>
            </div>
        </div>
    );
};

export default AddCoworker;
