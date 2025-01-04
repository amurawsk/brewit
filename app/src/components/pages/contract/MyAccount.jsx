import React from 'react';
import styles from './MyAccount.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittle from '../../utils/PageTittle.jsx';
import AccountInfo from '../../modules/common/AccountInfo.jsx';

const MyAccount = () => {
    const accountInfo = {
        username: 'testowy',
        created_at: '2024-01-01T10:00:00.000Z',
        brewery_name: 'ABC',
        brewery_owner_name: 'Jan Kowalski',
        brewery_description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, tenetur facilis deserunt, dicta dolores, sint at quisquam cumque voluptas inventore vero doloribus. Voluptatem voluptatum deleniti veniam unde fugiat pariatur fuga!',
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTittle text="Moje konto" />
                    <AccountInfo accountInfo={accountInfo} fromPage='contract' />
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
