import React, { useState, useEffect } from 'react';
import styles from './AddEditIngredient.module.css';

function AddEditIngredient({
    ingredientId,
    ingredient,
    stepIndex,
    handleSubmit,
    handleCancel
}) {
    const [localIngredientData, setLocalIngredientData] = useState({
        name: '',
        quantity: ''
    });

    useEffect(() => {
        if (ingredient) {
            setLocalIngredientData(ingredient);
        }
    }, [ingredient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalIngredientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(localIngredientData, ingredientId, stepIndex);
    };

    const onCancel = () => {
        handleCancel();
    };

    return (
        <form onSubmit={onSubmit} className={styles.addDeviceForm}>
            <h4>
                {ingredientId !== null
                    ? 'Edytuj składnik'
                    : 'Dodaj składnik'}
            </h4>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="name">
                    <b>Nazwa składnika: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="name"
                    placeholder="Nazwa składnika"
                    value={localIngredientData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="quantity">
                    <b>Ilość: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="quantity"
                    placeholder="Ilość"
                    value={localIngredientData.quantity}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.insertDeviceButton}>
                    {ingredientId !== null ? 'Zaktualizuj składnik' : 'Dodaj składnik'}
                </button>
                <button
                    type="button"
                    className={styles.insertDeviceButton}
                    onClick={onCancel}
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
}

export default AddEditIngredient;
