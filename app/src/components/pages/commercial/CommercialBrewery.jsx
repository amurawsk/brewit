import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import BreweryInfo from '../../modules/common/BreweryInfo.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import EditBreweryInfo from '../../modules/common/EditBreweryInfo';
import BreweryShortStats from '../../modules/common/BreweryShortStats.jsx';

import styles from './CommercialBrewery.module.css';

import api from '../../../api.js';

/**
 * Commercial Brewery page - allows to view or edit brewery data, contains layout (Header, Sidebar, Title, Button) and BreweryInfo, BreweryShortStats components
 */
const CommercialBrewery = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [breweryData, setBreweryData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log()
                const response = await api.get(`commercial-brewery/${parseInt(localStorage.getItem('breweryId'))}/`);
                if (response.status === 200) {
                    setBreweryData(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching devices:', error);
            }
        };
        getData();
    }, []);

    // TODO
    const editInfo = () => {
        setIsPanelOpen(true);
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <CommercialSidebar />
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
