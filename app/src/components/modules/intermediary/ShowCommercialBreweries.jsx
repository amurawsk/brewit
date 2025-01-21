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
        navigate('/intermediary/commercial-breweries/brewery-details', {
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
                    <div className={styles.statDescriptionBar}>
                        <div className={styles.statDescription}>
                            <div
                                className={styles.statBoxHeader}
                                style={{ backgroundColor: '#f0a' }}></div>
                            <span className={styles.statText}>
                                Liczba tanków warzelnych w browarze
                            </span>
                        </div>
                        <div className={styles.statDescription}>
                            <div
                                className={styles.statBoxHeader}
                                style={{ backgroundColor: '#0af' }}></div>
                            <span className={styles.statText}>
                                Liczba pojemników fermentacyjnych w browarze
                            </span>
                        </div>
                        <div className={styles.statDescription}>
                            <div
                                className={styles.statBoxHeader}
                                style={{ backgroundColor: '#fa0' }}></div>
                            <span className={styles.statText}>
                                Liczba kotłów do leżakowania w browarze
                            </span>
                        </div>
                        <div className={styles.statDescription}>
                            <div
                                className={styles.statBoxHeader}
                                style={{ backgroundColor: '#0fa' }}></div>
                            <span className={styles.statText}>
                                Liczba urządzeń do rozlewu w browarze
                            </span>
                        </div>
                    </div>

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

                            <div className={styles.breweryStats}>
                                <div
                                    className={styles.statBox}
                                    style={{ backgroundColor: '#f0a' }}>
                                    <span className={styles.statValue}>
                                        {brewery.bt_number}
                                    </span>
                                </div>
                                <div
                                    className={styles.statBox}
                                    style={{ backgroundColor: '#0af' }}>
                                    <span className={styles.statValue}>
                                        {brewery.ft_number}
                                    </span>
                                </div>
                                <div
                                    className={styles.statBox}
                                    style={{ backgroundColor: '#fa0' }}>
                                    <span className={styles.statValue}>
                                        {brewery.ac_number}
                                    </span>
                                </div>
                                <div
                                    className={styles.statBox}
                                    style={{ backgroundColor: '#0fa' }}>
                                    <span className={styles.statValue}>
                                        {brewery.be_number}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowCommercialBreweries;
