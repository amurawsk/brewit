import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Coworkers.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import ShowCoworkers from '../../modules/common/ShowCoworkers.jsx';

import api from '../../../api.js';

/**
 * Coworkers page - contains layout (Header, Sidebar, Title, Button), displays coworkers for given brewery & user
 */
const Coworkers = () => {
    const navigate = useNavigate();
    const addCoworker = () => navigate('/commercial/coworkers/add');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coworkers, setCoworkers] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log();
                const response = await api.get(
                    `coworkers/`
                );
                if (response.status === 200) {
                    setCoworkers(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching devices:', error);
            }
        };
        if (!isModalOpen) {
            getData();
        }
    }, [isModalOpen]);

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
                    <PageTitleWithButton
                        text="Współpracownicy"
                        buttonText="Dodaj nowego współpracownika"
                        buttonFunction={addCoworker}
                    />
                    {coworkers !== null && (
                        <ShowCoworkers coworkers={coworkers} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Coworkers;
