import React, { useState, useEffect } from 'react';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import BreweryInfo from '../../modules/common/BreweryInfo.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import EditBreweryInfo from '../../modules/common/EditBreweryInfo';
import BreweryShortStats from '../../modules/common/BreweryShortStats.jsx';

import styles from './ContractBrewery.module.css';

/**
 * Contract Brewery page - allows to view or edit brewery data, contains layout (Header, Sidebar, Title, Button) and BreweryInfo, BreweryShortStats components
 */
const CommercialBrewery = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [breweryData, setBreweryData] = useState(null);
    const [statsData, setStatsData] = useState(null);

    // TODO mock
    const getData = () => {
        const brewery_info = {
            name: 'Przykład',
            email: 'example@gmail.com',
            phone_number: '123456789',
            ceo: 'Jan Kowalski',
            address: 'Szkolna 1',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate mollitia velit corrupti harum possimus ipsam nisi odit explicabo fugiat ea, tempora facilis accusantium perferendis voluptas minima, nam ratione numquam aliquid.',
        };
        const stats_info = {
            no_orders: 3,
            no_new: 1,
            no_current: 1,
            no_past: 1,
            no_rejected: 0,
            no_employees: 1,
        };

        setBreweryData(brewery_info);
        setStatsData(stats_info);
    };

    useEffect(() => {
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
                    {statsData !== null && (
                        <BreweryShortStats statsData={statsData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommercialBrewery;
