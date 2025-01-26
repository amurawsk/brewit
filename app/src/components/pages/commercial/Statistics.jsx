import React, { useState } from 'react';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.jsx';
import PageTitle from '../../utils/PageTitle.jsx';
import StatisticsTypes from '../../modules/commercial/StatisticsTypes.jsx';
import styles from './Statistics.module.css';
import PieChart from '../../modules/commercial/PieChart.jsx';
import BatchOrQuantity from '../../modules/commercial/BatchOrQuantity.jsx';
import Histogram from '../../modules/commercial/Histogram.jsx';
import TimeResolution from '../../modules/commercial/TimeResolution.jsx';

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
					{(activeStatus === 'D') && (
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
