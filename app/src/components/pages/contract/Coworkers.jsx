import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
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
    const addCoworker = () => navigate('/contract/coworkers/add');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coworkers, setCoworkers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`coworkers/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setCoworkers(response.data);
                } else {
                    setIsLoading(false);
                    alert('Błąd podczas pobierania współpracowników! Odśwież stronę i spróbuj ponownie.');
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        if (!isModalOpen) {
            getData();
        }
    }, [isModalOpen]);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
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
