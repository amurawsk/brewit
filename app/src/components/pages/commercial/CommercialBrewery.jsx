import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import BreweryInfo from '../../modules/commercial/BreweryInfo.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

import styles from './CommercialBrewery.module.css';
import BreweryShortStats from '../../modules/commercial/BreweryShortStats.jsx';

const CommercialBrewery = () => {
    // TODO
    const editInfo = () => {};

    // TODO mock
    const brewery_info = {
        name: 'Przykład',
        email: 'example@gmail.com',
        phone_number: '123456789',
        nip: '12345678901',
        address: 'Szkolna 1',
		ceo: 'Janusz Pijanka',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate mollitia velit corrupti harum possimus ipsam nisi odit explicabo fugiat ea, tempora facilis accusantium perferendis voluptas minima, nam ratione numquam aliquid.',
    };
    const stats_info = {
        no_devices: 1,
        no_bt: 1,
        no_ft: 0,
        no_ac: 0,
        no_be: 0,
        no_orders: 3,
        no_new: 1,
        no_current: 1,
        no_past: 1,
        no_rejected: 0,
        no_employees: 1,
		no_recipes: 0,
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
				{localStorage.getItem('userType') === 'commercial_brewery' && <CommercialSidebar />}
				{localStorage.getItem('userType') === 'contract_brewery' && <ContractSidebar />}
                <div className={styles.content}>
                    <PageTittleWithButton
                        text="Informacje o browarze"
                        buttonText="Edytuj informacje"
                        buttonFunction={editInfo}
                    />
                    <BreweryInfo breweryData={brewery_info} />
                    <PageTittle text="Statystyki" />
                    <BreweryShortStats statsData={stats_info} />
                </div>
            </div>
        </div>
    );
};

export default CommercialBrewery;
