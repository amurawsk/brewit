import React, { useState, useEffect } from 'react';
import styles from './AddEditStep.module.css';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

function AddEditStep({ recipe_id, step, setStep, handleCancel }) {

	const navigate = useNavigate();
	const goToRecipes = () => navigate('/contract/recipes');

    const [localStepData, setLocalStepData] = useState({
		pk: '',
        name: '',
        device_type: '',
        time: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
		if (step?.name) {
	        try {
    	        const response = await api.post(`recipies/stages/update`, {
					id: step.pk,
					name: localStepData.name,
					device: localStepData.device_type,
					time: localStepData.time,
					description: localStepData.description,
            	});
	            if (response.status === 200) {
					setStep(localStepData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error editing:', error);
        	}
		} else {
			try {
    	        const response = await api.post(`recipies/stages/`, {
					recipe_id: recipe_id,
					name: localStepData.name,
					device: localStepData.device_type,
					time: localStepData.time,
					description: localStepData.description,
            	});
	            if (response.status === 201) {
					setStep(localStepData);
					handleCancel();
					goToRecipes();
        	    }
	        } catch (error) {
    	        console.error('Error adding', error);
        	}
		}
    };

    useEffect(() => {
        if (step) {
            setLocalStepData(step);
        }
		console.log(step.pk)
    }, [step]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalStepData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.addDeviceForm}>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="name">
                    <b>Nazwa etapu: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="name"
                    placeholder="Nazwa etapu"
                    value={localStepData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="device">
                    <b>Typ urządzenia: </b>
                </label>
                <select
                    className={styles.dropboxInput}
                    name="device_type"
                    value={localStepData.device_type}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>
                        Wybierz typ
                    </option>
                    <option value="BT">Tank Warzelny</option>
                    <option value="FT">Pojemnik fermentacyjny</option>
                    <option value="AC">Kocioł do leżakowania</option>
                    <option value="BE">Urządzenie do rozlewania</option>
                </select>
            </div>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="time">
                    <b>Czas: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="number"
                    name="time"
                    min="0"
                    step="1"
                    placeholder="Czas"
                    value={localStepData.time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label
                    className={styles.addEquipmentLabel}
                    htmlFor="description">
                    <b>Opis etapu: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    name="description"
                    placeholder="Opis"
                    value={localStepData.description}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.insertDeviceButton}>
                    {step?.name ? 'Zaktualizuj etap' : 'Dodaj etap'}
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

export default AddEditStep;
