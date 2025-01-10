import React, { useState, useEffect } from 'react';
import styles from './AddEditRecipe.module.css';

function AddEditRecipe({ recipe, handleSubmit, handleCancel }) {
    const [localFormData, setLocalFormData] = useState({
        name: '',
        full_time: '',
        full_volume: '',
        steps: [],
    });

    useEffect(() => {
        if (recipe) {
            setLocalFormData({
                ...recipe,
                steps: recipe.steps || [],
            });
        }
    }, [recipe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(localFormData);
    };

    const onCancel = () => {
        handleCancel();
    };

    return (
        <form onSubmit={onSubmit} className={styles.addDeviceForm}>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="name">
                    <b>Nazwa przepisu: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="name"
                    maxLength={100}
                    placeholder="Wpisz nazwę przepisu"
                    value={localFormData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="full_time">
                    <b>Całkowity czas: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="full_time"
                    maxLength={100}
                    placeholder="Wpisz całkowity czas"
                    value={localFormData.full_time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label
                    className={styles.addEquipmentLabel}
                    htmlFor="full_volume">
                    <b>Całkowita objętość (L): </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="number"
                    name="full_volume"
                    min="0"
                    step="0.1"
                    placeholder="Wpisz całkowitą objętość"
                    value={localFormData.full_volume}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.insertDeviceButton}>
                    {recipe?.name ? 'Zaktualizuj' : 'Dodaj'}
                </button>
                {recipe?.name && (
                    <button
                        type="button"
                        className={styles.insertDeviceButton}
                        onClick={onCancel}>
                        Anuluj
                    </button>
                )}
            </div>
        </form>
    );
}

export default AddEditRecipe;
