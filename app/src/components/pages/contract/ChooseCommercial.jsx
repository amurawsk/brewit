import React, { useState } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import ShowCommercialBreweries from '../../modules/contract/ShowCommercialBreweries.jsx'

import styles from './ChooseCommercial.module.css';

/**
 * ChooseCommercial for Contract Brewery - contains layout (Header, Sidebar) and ShowCommercialBreweries
 */
const ChooseCommercial = () => {
    // TODO MOCK
    const [breweries, setBreweries] = useState([{id: 1, name: 'TestBrewery', nip: '1234567890', address: 'Szkolna 1'}, {id: 2, name: 'TestBrewery2', nip: '1234567890', address: 'Szkolna 1'}]);


    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Wybierz browar komercyjny" />
                    <ShowCommercialBreweries breweries={breweries}/>
                </div>
            </div>
        </div>
    );
};

export default ChooseCommercial;
