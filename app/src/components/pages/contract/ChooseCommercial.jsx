import React, { useEffect, useState } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import ShowCommercialBreweries from '../../modules/contract/ShowCommercialBreweries.jsx';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './ChooseCommercial.module.css';

import api from '../../../api.js';

/**
 * ChooseCommercial for Contract Brewery - contains layout (Header, Sidebar) and ShowCommercialBreweries
 */
const ChooseCommercial = () => {
    const [breweries, setBreweries] = useState();
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
                    console.log(response);
                }
            } catch (error) {
                setIsLoading(false);
                console.log('Error fetching commercial breweries:', error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Wybierz browar komercyjny" />
                    {breweries && (
                        <ShowCommercialBreweries breweries={breweries} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChooseCommercial;
