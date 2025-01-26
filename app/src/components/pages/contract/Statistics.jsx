import React, { useState } from 'react';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import StatisticsTypes from '../../modules/contract/StatisticsTypes.jsx';
import styles from './Statistics.module.css';
import PieChart from '../../modules/contract/PieChart.jsx';
import BatchOrQuantity from '../../modules/contract/BatchOrQuantity.jsx';
import Histogram from '../../modules/contract/Histogram.jsx';
import TimeResolution from '../../modules/contract/TimeResolution.jsx';

const Statistics = () => {
    const status = 'TB';
    const [activeStatus, setActiveStatus] = useState(status);

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <CommercialSidebar />
                <div className={styles.content}>
                    <div className={styles.TitleButtonContainer}>
                        <PageTitle text="Statystyki" />
                        <StatisticsTypes
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                        />
                    </div>
					{(activeStatus === 'B') && (
                        <div>
                            <Histogram status={activeStatus} />
                        </div>
                    )}

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
