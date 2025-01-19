import React, { useState } from 'react';
import styles from './EditBreweryInfo.module.css';

import api from '../../../api.js';

/**
 * EditBreweryInfo - enables editing brewery data
 * @param isPanelOpen - determines if panel is visible
 * @param setIsPanelOpen - setter for isPanelOpen
 * @param breweryData - current brewery data
 */
const EditBreweryInfo = ({ isPanelOpen, setIsPanelOpen, breweryData }) => {
    const [currentBreweryData, setCurrentBreweryData] = useState(breweryData);

    const closePanel = () => {
        setIsPanelOpen(false);
        setCurrentBreweryData(breweryData);
    };

    const editData = async () => {
        try {
            if (localStorage.getItem('userType') === 'commercial_brewery') {
                const response = await api.post(`commercial-brewery/${parseInt(localStorage.getItem('breweryId'))}/`, {
                    name: currentBreweryData.name,
                    email: currentBreweryData.email,
                    phone_number: currentBreweryData.phone_number,
                    nip: currentBreweryData.nip,
                    address: currentBreweryData.address,
                    description: currentBreweryData.description
                });
                if (response.status !== 200) {
                    console.log('Wystąpił błąd', response)
                }
            } else if (localStorage.getItem('userType') === 'contract_brewery') {
                const response = await api.post(`contract-brewery/${parseInt(localStorage.getItem('breweryId'))}/`, {
                    name: currentBreweryData.name,
                    email: currentBreweryData.email,
                    phone_number: currentBreweryData.phone_number,
                    owner_name: currentBreweryData.owner_name,
                    description: currentBreweryData.description
                });
                if (response.status !== 200) {
                    console.log('Wystąpił błąd', response)
                }
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
            alert('Błąd sieci! Spróbuj ponownie później.');
        }
        setIsPanelOpen(false);
        setCurrentBreweryData(breweryData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBreweryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            {isPanelOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <h2 className={styles.header}>Edytuj informacje</h2>
                        <form className={styles.editDataForm}>
                            <div className={styles.leftColumn}>
                                <div>
                                    <label className={styles.dataLabel}>
                                        Nazwa browaru
                                    </label>
                                    <input
                                        className={styles.dataInput}
                                        type="text"
                                        placeholder="Podaj nazwę"
                                        name="name"
                                        value={currentBreweryData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styles.dataLabel}>
                                        Email kontaktowy
                                    </label>
                                    <input
                                        className={styles.dataInput}
                                        type="email"
                                        placeholder="Podaj email"
                                        name="email"
                                        value={currentBreweryData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styles.dataLabel}>
                                        Opis (opcjonalne)
                                    </label>
                                    <textarea
                                        className={`${styles.dataInput} ${styles.descriptionInput}`}
                                        placeholder="Podaj opis swojego browaru"
                                        name="description"
                                        value={currentBreweryData.description}
                                        onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className={styles.rightColumn}>
                                <div>
                                    <label className={styles.dataLabel}>
                                        Telefon kontaktowy
                                    </label>
                                    <input
                                        className={styles.dataInput}
                                        type="text"
                                        placeholder="Podaj numer"
                                        name="phone_number"
                                        value={currentBreweryData.phone_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {localStorage.getItem('userType') ===
                                    'commercial_brewery' && (
                                    <div>
                                        <label className={styles.dataLabel}>
                                            NIP
                                        </label>
                                        <input
                                            className={styles.dataInput}
                                            type="text"
                                            placeholder="Podaj NIP"
                                            name="nip"
                                            value={currentBreweryData.nip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}
                                {localStorage.getItem('userType') ===
                                    'contract_brewery' && (
                                    <div>
                                        <label className={styles.dataLabel}>
                                            Dane właściciela
                                        </label>
                                        <input
                                            className={styles.dataInput}
                                            type="text"
                                            placeholder="Podaj imię i nazwisko właściciela"
                                            name="owner_name"
                                            value={currentBreweryData.ceo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className={styles.dataLabel}>
                                        Adres
                                    </label>
                                    <input
                                        className={styles.dataInput}
                                        type="text"
                                        placeholder="Podaj adres"
                                        name="address"
                                        value={currentBreweryData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                        <div className={styles.buttonsContainer}>
                            <button
                                className={styles.backButton}
                                onClick={closePanel}>
                                Zamknij
                            </button>
                            <button
                                className={styles.changeDataButton}
                                onClick={editData}>
                                Zmień dane
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBreweryInfo;
