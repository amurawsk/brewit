import React, { useState } from 'react';
import styles from './EditBreweryInfo.module.css';

const EditBreweryInfo = ({ isPanelOpen, setIsPanelOpen, breweryData, fromPage }) => {
    const [currentBreweryData, setCurrentBreweryData] = useState(breweryData);

    const closePanel = () => {
        setIsPanelOpen(false);
        setCurrentBreweryData(breweryData);
    };

    const editData = () => {
        console.log(currentBreweryData);
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
                                {fromPage === 'commercial' && (
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
                                {fromPage === 'contract' && (
                                    <div>
                                        <label className={styles.dataLabel}>
                                            Dane właściciela
                                        </label>
                                        <input
                                            className={styles.dataInput}
                                            type="text"
                                            placeholder="Podaj imię i nazwisko właściciela"
                                            name="owner_name"
                                            value={currentBreweryData.owner_name}
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