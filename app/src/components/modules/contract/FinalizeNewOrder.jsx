import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewOrderTimeSlotsTimeline from './NewOrderTimeSlotsTimeline';
import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './FinalizeNewOrder.module.css';

import api from '../../../api.js';

/**
 * FinalizeNewOrder
 *
 * @param timeSlots
 */
const FinalizeNewOrder = ({ selectedBrewery, timeSlots }) => {
    const navigate = useNavigate();

    const [beerType, setBeerType] = useState('');
    const [beerVolume, setBeerVolume] = useState('');
    const [orderDescription, setOrderDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        const getRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`recipies/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setRecipes(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania urządzeń! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getRecipes();
    }, []);

    const handleSubmit = (e) => {
        const createOrder = async () => {
            setIsLoading(true);
            try {
                const response = await api.post(`orders/add/`, {
                    beer_type: beerType,
                    beer_volume: beerVolume,
                    description: orderDescription,
                    time_slot_ids: timeSlots.map((slot) => slot.timeSlotId),
                    recipe_id: selectedRecipeId,
                });
                if (response.status === 201) {
                    setIsLoading(false);
                    navigate('/contract/orders', {
                        state: { orderType: 'N' },
                    });
                } else {
                    setIsLoading(false);
                    alert('Błąd podczas tworzenia zlecenia! Odśwież i spróbuj ponownie');
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd podczas tworzenia zlecenia! Odśwież i spróbuj ponownie');
            }
        };
        e.preventDefault();
        createOrder();
    };

    const handleReset = () => {
        navigate('/contract/orders/add/choose-brewery');
    };

    const handleBack = () => {
        navigate('/contract/orders/add/select-timeslots', {
            state: { brewery: selectedBrewery, timeSlots: timeSlots },
        });
    };

    const handleInputChange = (e) => {
        const id = e.target.value;
        setSelectedRecipeId(id);
    };

    return (
        <div className={styles.content}>
            <LoadingOverlay isLoading={isLoading} />
            <div className={styles.section}>
                <h3>Wybrany browar komercyjny</h3>
                <p>
                    Nazwa browaru: <b>{selectedBrewery.name}</b>
                </p>
                <p>
                    Email kontaktowy: <b>{selectedBrewery.contract_email}</b>
                </p>
                <p>
                    Telefon kontaktowy:{' '}
                    <b>{selectedBrewery.contract_phone_number}</b>
                </p>
                <p>
                    NIP: <b>{selectedBrewery.nip}</b>
                </p>
                <p>
                    Adres: <b>{selectedBrewery.address}</b>
                </p>
                {selectedBrewery.description !== '' && (
                    <p>
                        Opis:
                        <p className={styles.descriptionText}>
                            {selectedBrewery.description}
                        </p>
                    </p>
                )}
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
                    <label className={styles.orderFormLabel} htmlFor="name">
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
                    <label className={styles.orderFormLabel} htmlFor="capacity">
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
                    <label className={styles.orderFormLabel} htmlFor="name">
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
                    <label className={styles.orderFormLabel} htmlFor="name">
                        <b>Dodaj recepturę: </b>
                    </label>
                    <select
                        className={styles.dropboxInput}
                        onChange={handleInputChange}>
                        <option value={null}>Brak receptury</option>
                        {recipes.map((recipe) => (
                            <option key={recipe.pk} value={recipe.pk}>
                                {' '}
                                {recipe.name}
                            </option>
                        ))}
                    </select>

                    <div className={styles.newOrderButtonGroup}>
                        <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={handleReset}>
                            Wyczyść zlecenie
                        </button>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={handleBack}>
                            Cofnij
                        </button>
                        {timeSlots.length !== 0 && (
                            <button
                                className={styles.submitButton}
                                type="submit">
                                Złóż zlecenie
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinalizeNewOrder;
