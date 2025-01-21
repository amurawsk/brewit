import React, { useState, useEffect } from 'react';
import styles from './AddEditRecipe.module.css';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

function AddEditRecipe({ recipe, setRecipe, handleCancel }) {

	const navigate = useNavigate();
	const goToRecipes = () => navigate('/contract/recipes');

    const [localFormData, setLocalFormData] = useState({
        name: '',
        full_volume: '',
        steps: [],
    });

	const handleSubmit = async (e) => {
        e.preventDefault();
		if (recipe?.name) {
	        try {
    	        const response = await api.post(`recipies/update/`, {
					id: recipe.pk,
					name: localFormData.name,
					full_volume: localFormData.full_volume,
            	});
	            if (response.status === 201) {
					setRecipe(localFormData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error fetching devices:', error);
        	}
		} else {
			try {
    	        const response = await api.post(`recipies/`, {
					name: localFormData.name,
					full_volume: localFormData.full_volume,
            	});
	            if (response.status === 201) {
					setRecipe(localFormData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error fetching devices:', error);
        	}
		}
    };

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

    return (
        <form onSubmit={handleSubmit} className={styles.addDeviceForm}>
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
                        onClick={() => handleCancel()}>
                        Anuluj
                    </button>
                )}
            </div>
        </form>
    );
}

export default AddEditRecipe;
