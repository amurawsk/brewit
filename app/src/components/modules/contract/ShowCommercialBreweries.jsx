import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ShowCommercialBreweries.module.css';

/**
 * ShowCommercialBreweries - displays coworkers styled list, shows username, created_at
 *
 * If breweries list is empty, component displays proper info
 * @param breweries - breweries list
 */
const ShowCommercialBreweries = ({ breweries }) => {
    const navigate = useNavigate();

    const selectBrewery = (brewery) => {
        navigate('/contract/orders/add/select-timeslots', {
            state: { brewery: brewery },
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
                                    NIP:
                                    <span className={styles.descriptionValue}>
                                        {' '}
                                        {brewery.nip}
                                    </span>
                                </span>
                                <span className={styles.description}>
                                    Adres:
                                    <span className={styles.descriptionValue}>
                                        {' '}
                                        {brewery.address}
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

export default ShowCommercialBreweries;
