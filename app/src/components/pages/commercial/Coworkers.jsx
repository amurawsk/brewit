import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import ShowCoworkers from '../../modules/common/ShowCoworkers.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './Coworkers.module.css';

import api from '../../../api.js';

/**
 * Coworkers page - contains layout (Header, Sidebar, Title, Button), displays coworkers for given brewery & user
 */
const Coworkers = () => {
    const navigate = useNavigate();
    const addCoworker = () => navigate('/commercial/coworkers/add');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coworkers, setCoworkers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`coworkers/`);
                if (response.status === 200) {
                    setCoworkers(response.data);
                    setIsLoading(false);
                } else {
                    alert(
                        'Błąd podczas pobierania współpracowników! Odśwież stronę i spróbuj ponownie.'
                    );
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        if (!isModalOpen) {
            setIsLoading(true);
            getData();
        }
    }, [isModalOpen]);

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
                    <PageTitleWithButton
                        text="Współpracownicy"
                        buttonText="Dodaj nowego współpracownika"
                        buttonFunction={addCoworker}
                    />
                    {coworkers !== null && (
                        <ShowCoworkers
                            coworkers={coworkers}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Coworkers;
