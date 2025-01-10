import React from 'react';
import styles from './MyAccount.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import AccountInfo from '../../modules/common/AccountInfo.jsx';

/**
 * Account page - contains layout (Dashboard, Sidebar, Title), displays account details and most important brewery info
 */
const MyAccount = () => {
    const accountInfo = {
        username: 'testowy',
        created_at: '2024-01-01T10:00:00.000Z',
        brewery_name: 'ABC',
        brewery_nip: '12345678901',
        brewery_address: 'Szkolna 1',
        brewery_description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, tenetur facilis deserunt, dicta dolores, sint at quisquam cumque voluptas inventore vero doloribus. Voluptatem voluptatum deleniti veniam unde fugiat pariatur fuga!',
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <CommercialSidebar />
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <ContractSidebar />
                )}
                <div className={styles.content}>
                    <PageTitle text="Moje konto" />
                    <AccountInfo accountInfo={accountInfo} />
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
