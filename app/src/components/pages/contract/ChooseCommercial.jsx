import React, { useEffect, useState } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import ShowCommercialBreweries from '../../modules/contract/ShowCommercialBreweries.jsx';

import styles from './ChooseCommercial.module.css';

/**
 * ChooseCommercial for Contract Brewery - contains layout (Header, Sidebar) and ShowCommercialBreweries
 */
const ChooseCommercial = () => {
    // TODO MOCK
    const [breweries, setBreweries] = useState();

    useEffect(() => {
        setBreweries([
            {
                id: 1,
                name: 'TestBrewery',
                nip: '1234567890',
                address: 'Szkolna 1',
                phone_number: '123456789',
                email: 'example@gmail.com',
                description: 'Some description',
                no_bt: 1,
                no_ft: 1,
                no_ac: 1,
                no_be: 1,
            },
            {
                id: 2,
                name: 'TestBrewery2',
                nip: '1234567890',
                address: 'Szkolna 1',
                phone_number: '123456789',
                email: 'example@gmail.com',
                description: 'Some description',
                no_bt: 1,
                no_ft: 1,
                no_ac: 1,
                no_be: 1,
            },
        ]);
    }, []);

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitle text="Wybierz browar komercyjny" />
                    {breweries && 
                        <ShowCommercialBreweries breweries={breweries} />
                    }
                </div>
            </div>
        </div>
    );
};

export default ChooseCommercial;
