import React, { useState } from 'react';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import StatisticsTypes from '../../modules/StatisticsTypes.jsx';
import styles from './Statistics.module.css';
import PieChart from '../../modules/commercial/PieChart.jsx';
import BatchOrQuantity from '../../modules/BatchOrQuantity.jsx';
import Histogram from '../../modules/commercial/Histogram.jsx';
import TimeResolution from '../../modules/TimeResolution.jsx';

const Statistics = () => {
    const status = 'TB';
    const [activeStatus, setActiveStatus] = useState(status);

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                {localStorage.getItem('userType') === 'commercial_brewery' && (
                    <CommercialSidebar />
                )}
                {localStorage.getItem('userType') === 'contract_brewery' && (
                    <ContractSidebar />
                )}
                <div className={styles.content}>
                    <div className={styles.TitleButtonContainer}>
                        <PageTitle text="Statystyki" />
                        <StatisticsTypes
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                        />
                    </div>

                    {(activeStatus === 'TB' || activeStatus === 'TQ') && (
                        <div>
                            <BatchOrQuantity
                                activeStatus={activeStatus}
                                setActiveStatus={setActiveStatus}
                            />
                            {activeStatus === 'TQ' && (
                                <Histogram status={activeStatus} />
                            )}

                            {activeStatus === 'TB' && (
                                <PieChart status={activeStatus} />
                            )}
                        </div>
                    )}

                    {(activeStatus === 'QD' ||
                        activeStatus === 'QM' ||
                        activeStatus === 'QY') && (
                        <div>
                            <TimeResolution
                                activeStatus={activeStatus}
                                setActiveStatus={setActiveStatus}
                            />
                            <Histogram status={activeStatus} />
                        </div>
                    )}

                    {activeStatus === 'R' && <PieChart status={activeStatus} />}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
