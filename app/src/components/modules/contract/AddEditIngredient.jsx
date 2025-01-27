import React, { useState, useEffect } from 'react';
import styles from './AddEditIngredient.module.css';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

function AddEditIngredient({ stage_id, ingredient, setIngredient, handleCancel }) {

	const navigate = useNavigate();
	const goToRecipes = () => navigate('/contract/recipes');

	console.log(stage_id);
    const [localIngredientData, setLocalIngredientData] = useState({
        name: '',
        amount: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
		if (ingredient?.name) {
	        try {
    	        const response = await api.post(`recipies/stages/ingredients/update`, {
					id: ingredient.pk,
					name: localIngredientData.name,
					quantity: localIngredientData.amount
            	});
	            if (response.status === 200) {
					setIngredient(localIngredientData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error editing:', error);
        	}
		} else {
			try {
    	        const response = await api.post(`recipies/stages/ingredients/`, {
					stage_id: stage_id,
					name: localIngredientData.name,
					quantity: localIngredientData.amount
            	});
	            if (response.status === 201) {
					setIngredient(localIngredientData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error adding', error);
        	}
		}
    };

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

    return (
        <form onSubmit={handleSubmit} className={styles.addDeviceForm}>
            <h4>
                {ingredient?.name ? 'Edytuj składnik' : 'Dodaj składnik'}
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
                <label className={styles.addEquipmentLabel} htmlFor="amount">
                    <b>Ilość (razem z jednostką): </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="amount"
                    placeholder="Ilość"
                    value={localIngredientData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.insertDeviceButton}>
                    {ingredient?.name
                        ? 'Zaktualizuj składnik'
                        : 'Dodaj składnik'}
                </button>
                <button
                    type="button"
                    className={styles.insertDeviceButton}
                    onClick={() => handleCancel()}>
                    Anuluj
                </button>
            </div>
        </form>
    );
}

export default AddEditIngredient;
