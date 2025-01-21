import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ShowContractBreweries.module.css';

/**
 * ShowContractBreweries - displays coworkers styled list, shows username, created_at
 *
 * If breweries list is empty, component displays proper info
 * @param breweries - breweries list
 */
const ShowContractBreweries = ({ breweries }) => {
    const navigate = useNavigate();

    const selectBrewery = (brewery) => {
        navigate('/intermediary/contract-breweries/brewery-details', {
            state: { breweryId: brewery.id },
        });
    };

    return (
        <div>
            {breweries.length === 0 ? (
                <p className={styles.noOrdersMessage}>
                    Brak browarów komercyjnych.
                </p>
            ) : (
                <div className={styles.allBreweries}>
                    {breweries.map((brewery, index) => (
                        <div
                            className={styles.brewery}
                            key={brewery.id}
                            onClick={() => selectBrewery(brewery)}>
                            <div className={styles.breweryText}>
                                <span className={styles.textTitle}>
                                    {brewery.name}
                                </span>
                                <span className={styles.description}>
                                    Imię i nazwisko właściciela:
                                    <span className={styles.descriptionValue}>
                                        {' '}
                                        {brewery.owner_name}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowContractBreweries;
