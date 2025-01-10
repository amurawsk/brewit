import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Coworkers.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import ShowCoworkers from '../../modules/common/ShowCoworkers.jsx';

/**
 * Coworkers page - contains layout (Header, Sidebar, Tittle, Button), displays coworkers for given brewery & user
 */
const Coworkers = () => {
    const navigate = useNavigate();

    const addCoworker = () => navigate('/contract/coworkers/add');

    // TODO mock values
    const coworkers = [
        {
            username: 'jan_kowalski',
            added_at: '2024-01-01T10:00:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
        {
            username: 'anna_nowak',
            added_at: '2024-02-15T12:30:00.000Z',
        },
    ];

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTittleWithButton
                        text="Współpracownicy"
                        buttonText="Dodaj nowego współpracownika"
                        buttonFunction={addCoworker}
                    />
                    <ShowCoworkers coworkers={coworkers} />
                </div>
            </div>
        </div>
    );
};

export default Coworkers;
