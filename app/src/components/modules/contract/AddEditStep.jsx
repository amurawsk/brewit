import React, { useState, useEffect } from 'react';
import styles from './AddEditStep.module.css';

function AddEditStep({ stepIndex, step, handleSubmit, handleCancel }) {
    const [localStepData, setLocalStepData] = useState({
        name: '',
        device: '',
        time: '',
        description: '',
    });

    useEffect(() => {
        if (step) {
            setLocalStepData(step);
        }
    }, [step]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalStepData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(localStepData, stepIndex);
    };

    const onCancel = () => {
        handleCancel();
    };

    return (
        <form onSubmit={onSubmit} className={styles.addDeviceForm}>
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
                    name="device"
                    value={localStepData.device}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>
                        Wybierz typ
                    </option>
                    <option value="Tank Warzelny">Tank Warzelny</option>
                    <option value="Pojemnik fermentacyjny">
                        Pojemnik fermentacyjny
                    </option>
                    <option value="Kocioł do leżakowania">
                        Kocioł do leżakowania
                    </option>
                    <option value="Urządzenie do rozlewania">
                        Urządzenie do rozlewania
                    </option>
                </select>
            </div>
            <div>
                <label className={styles.addEquipmentLabel} htmlFor="time">
                    <b>Czas: </b>
                </label>
                <input
                    className={styles.addEquipmentInput}
                    type="text"
                    name="time"
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
                    onClick={onCancel}>
                    Anuluj
                </button>
            </div>
        </form>
    );
}

export default AddEditStep;
