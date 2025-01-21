import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import BreweryInfo from '../../modules/common/BreweryInfo.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import EditBreweryInfo from '../../modules/common/EditBreweryInfo';
import BreweryShortStats from '../../modules/common/BreweryShortStats.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ContractBrewery.module.css';

import api from '../../../api.js';

/**
 * Contract Brewery page - allows to view or edit brewery data, contains layout (Header, Sidebar, Title, Button) and BreweryInfo, BreweryShortStats components
 */
const CommercialBrewery = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [breweryData, setBreweryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(
                    `contract-brewery/${parseInt(localStorage.getItem('breweryId'))}/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setBreweryData(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania informacji o browarze! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, [isPanelOpen]);

    const editInfo = () => {
        setIsPanelOpen(true);
    };

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
                        text="Informacje o browarze"
                        buttonText="Edytuj informacje"
                        buttonFunction={editInfo}
                    />
                    {breweryData !== null && (
                        <BreweryInfo breweryData={breweryData} />
                    )}
                    {isPanelOpen && breweryData !== null && (
                        <EditBreweryInfo
                            isPanelOpen={isPanelOpen}
                            setIsPanelOpen={setIsPanelOpen}
                            breweryData={breweryData}
                        />
                    )}
                    <PageTitle text="Statystyki" />
                    {breweryData !== null && (
                        <BreweryShortStats statsData={breweryData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommercialBrewery;
