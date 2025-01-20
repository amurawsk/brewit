import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import IntermediarySidebar from '../../modules/intermediary/IntermediarySidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import ShowCommercialBreweries from '../../modules/intermediary/ShowCommercialBreweries.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './CommercialBreweries.module.css';

import api from '../../../api.js';

const CommercialBreweries = () => {
    const [breweries, setBreweries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(
                    `breweries/commercial/with-devices/`
                );
                if (response.status === 200) {
                    setIsLoading(false);
                    setBreweries(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania browarów komercyjnych! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, []);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <IntermediarySidebar />
                <div className={styles.content}>
                    <PageTitle text="Browary komercyjne" />
                    {breweries && (
                        <ShowCommercialBreweries breweries={breweries} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommercialBreweries;
