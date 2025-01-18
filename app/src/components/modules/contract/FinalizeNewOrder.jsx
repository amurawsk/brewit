import React, { useState } from 'react';
import styles from './FinalizeNewOrder.module.css';
import NewOrderTimeSlotsTimeline from './NewOrderTimeSlotsTimeline';

/**
 * FinalizeNewOrder
 *
 * @param timeSlots
 */
const FinalizeNewOrder = ({ selectedBrewery, timeSlots }) => {
    const [beerType, setBeerType] = useState('');
    const [beerVolume, setBeerVolume] = useState('');
    const [orderDescription, setOrderDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            beerType,
            beerVolume,
            orderDescription,
            selectedBrewery,
            timeSlots,
        });
        alert('Zamówienie zostało złożone!');
    };

    const handleReset = () => {
        setBeerType('');
        setBeerVolume(0);
        setOrderDescription('');
    };

    const handleBack = () => {
        console.log("Cofnięto działanie");
    };

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <h3>Wybrany browar komercyjny</h3>
                <p>
                    Nazwa browaru: <b>{selectedBrewery.name}</b>
                </p>
                <p>
                    Email kontaktowy: <b>{selectedBrewery.email}</b>
                </p>
                <p>
                    Telefon kontaktowy: <b>{selectedBrewery.phone_number}</b>
                </p>
                <p>
                    NIP: <b>{selectedBrewery.nip}</b>
                </p>
                <p>
                    Adres: <b>{selectedBrewery.address}</b>
                </p>
                <p>
                    Opis:
                    <p className={styles.descriptionText}>
                        {selectedBrewery.description}
                    </p>
                </p>
            </div>
            <div className={styles.section}>
                <h3>Wybrane okna czasowe</h3>
                {timeSlots.length === 0 ? (
                    <p className={styles.noOrdersMessage}>
                        Dodaj okno czasowe, aby utworzyć zlecenie.
                    </p>
                ) : (
                    <NewOrderTimeSlotsTimeline timeSlots={timeSlots} />
                )}
            </div>

            <div className={styles.section}>
                <h3>Informacje</h3>
                <form className={styles.orderForm} onSubmit={handleSubmit}>
                    <label
                        className={styles.orderFormLabel}
                        htmlFor="name">
                        <b>Typ piwa: </b>
                    </label>
                    <input
                        className={styles.orderFormInput}
                        type="text"
                        name="name"
                        maxLength={100}
                        placeholder="Wprowadź typ piwa"
                        value={beerType}
                        onChange={(e) => setBeerType(e.target.value)}
                        required
                    />
                    <label
                        className={styles.orderFormLabel}
                        htmlFor="capacity">
                        <b>Całkowita objętość piwa (L): </b>
                    </label>
                    <input
                        className={styles.orderFormInput}
                        type="number"
                        name="capacity"
                        min="0"
                        step="0.1"
                        placeholder="Wpisz pojemność"
                        value={beerVolume}
                        onChange={(e) => setBeerVolume(e.target.value)}
                        required
                    />
                    <label
                        className={styles.orderFormLabel}
                        htmlFor="name">
                        <b>Opis: </b>
                    </label>
                    <input
                        className={styles.orderFormInput}
                        type="text"
                        name="name"
                        maxLength={255}
                        placeholder="Wprowadź opis"
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                    />
                    <div className={styles.newOrderButtonGroup}>
                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={handleReset}
                        >
                            Wyczyść zlecenie
                        </button>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={handleBack}
                        >
                            Cofnij
                        </button>
                        <button
                            className={styles.submitButton}
                            type="submit"
                        >
                            Złóż zlecenie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinalizeNewOrder;
