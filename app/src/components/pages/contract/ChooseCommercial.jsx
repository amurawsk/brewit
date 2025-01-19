import React, { useEffect, useState } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import ShowCommercialBreweries from '../../modules/contract/ShowCommercialBreweries.jsx';

import styles from './ChooseCommercial.module.css';

import api from '../../../api.js';

/**
 * ChooseCommercial for Contract Brewery - contains layout (Header, Sidebar) and ShowCommercialBreweries
 */
const ChooseCommercial = () => {
    const [breweries, setBreweries] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                console.log();
                const response = await api.get(
                    `breweries/commercial/with-devices/`
                );
                if (response.status === 200) {
                    setBreweries(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log('Error fetching commercial breweries:', error);
            }
        };
        getData();
    }, []);

    return (
        <div>
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
