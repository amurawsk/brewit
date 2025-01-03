import React, { useState } from 'react';
import styles from './AddDeviceForm.module.css';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

const AddDeviceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        device_type: '',
        serial_number: '',
        capacity: '',
        temperature_min: 0,
        temperature_max: 0,
        sour_beers: false,
        carbonation: [],
        supported_containers: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        console.log(formData)
    };

    const handleCarbonationChange = (value, checked) => {
        setFormData((prevData) => {
            const updatedCarbonation = checked
                ? [...prevData.carbonation, value]
                : prevData.carbonation.filter((item) => item !== value);

            return { ...prevData, carbonation: updatedCarbonation };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`devices/add/`, {
                ...formData,
                capacity: parseFloat(formData.capacity),
                temperature_min: parseFloat(formData.temperature_min),
                temperature_max: parseFloat(formData.temperature_max),
                carbonation: formData.carbonation.join(','),
            });
            if (response.status === 201) {
                navigate('/commercial/devices');
            } else {
                console.error('Error:', response);
                alert('Błąd podczas dodawania urządzenia!');
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
            alert('Błąd sieci! Spróbuj ponownie później.');
        }
    };

    const { device_type, carbonation } = formData;

    return (
        <div>
            <div className={styles.deviceTypeDropbox}>
                <label
                    className={styles.addEquipmentLabel}
                    htmlFor="device_type">
                    <b>Wybierz typ urządzenia: </b>
                </label>
                <select
                    className={styles.dropboxInput}
                    name="device_type"
                    onChange={handleChange}
                    value={device_type}>
                    <option value="" disabled>
                        Wybierz typ
                    </option>
                    <option value="BT">Tank Warzelny</option>
                    <option value="FT">Pojemnik fermentacyjny</option>
                    <option value="AC">Kocioł do leżakowania</option>
                    <option value="BE">Urządzenie do rozlewania</option>
                </select>
            </div>
            <form className={styles.addDeviceForm} onSubmit={handleSubmit}>
                {device_type && (
                    <>
                        <div>
                            <label
                                className={styles.addEquipmentLabel}
                                htmlFor="name">
                                <b>Nazwa urządzenia: </b>
                            </label>
                            <input
                                className={styles.addEquipmentInput}
                                type="text"
                                name="name"
                                maxLength={100}
                                placeholder="Wpisz nazwę urządzenia"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                className={styles.addEquipmentLabel}
                                htmlFor="serial_number">
                                <b>Numer seryjny: </b>
                            </label>
                            <input
                                className={styles.addEquipmentInput}
                                type="text"
                                name="serial_number"
                                maxLength={100}
                                placeholder="Wpisz numer seryjny"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                className={styles.addEquipmentLabel}
                                htmlFor="capacity">
                                <b>Pojemność (L): </b>
                            </label>
                            <input
                                className={styles.addEquipmentInput}
                                type="number"
                                name="capacity"
                                min="0"
                                step="0.1"
                                placeholder="Wpisz pojemność"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}
                {device_type !== 'BE' && device_type && (
                    <>
                        <div>
                            <label
                                className={styles.addEquipmentLabel}
                                htmlFor="temperature_min">
                                <b>Temperatura minimalna (℃): </b>
                            </label>
                            <input
                                className={styles.addEquipmentInput}
                                type="number"
                                name="temperature_min"
                                max={formData.temperature_max}
                                step="0.5"
                                placeholder="Wpisz temperaturę minimalną"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                className={styles.addEquipmentLabel}
                                htmlFor="temperature_max">
                                <b>Temperatura maksymalna (℃): </b>
                            </label>
                            <input
                                className={styles.addEquipmentInput}
                                type="number"
                                name="temperature_max"
                                min={formData.temperature_min}
                                step="0.5"
                                placeholder="Wpisz temperaturę maksymalną"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}
                {device_type && (
                    <div className={styles.sourBeerCheckbox}>
                        <label
                            className={styles.addEquipmentLabel}
                            htmlFor="sour_beers">
                            <b>Do produkcji kwaśnych piw: </b>
                        </label>
                        <input
                            className={styles.addEquipmentInputCheckbox}
                            type="checkbox"
                            name="sour_beers"
                            onChange={handleChange}
                        />
                    </div>
                )}
                {(device_type === 'BT' || device_type === 'BE') && (
                    <div className={styles.sourBeerCheckbox}>
                        <label
                            className={styles.addEquipmentLabel}
                            htmlFor="carbonation">
                            <b>Nagazowanie: </b>
                        </label>
                        <div>
                            {['CO2', 'N2', 'mieszanka'].map((option) => (
                                <React.Fragment key={option}>
                                    <input
                                        className={
                                            styles.addEquipmentInputCheckbox
                                        }
                                        type="checkbox"
                                        id={option}
                                        value={option}
                                        checked={carbonation.includes(option)}
                                        onChange={(e) =>
                                            handleCarbonationChange(
                                                e.target.value,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label
                                        className={styles.panelContentLabel}
                                        htmlFor={option}>
                                        {option}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                {device_type === 'BE' && (
                    <div>
                        <label
                            className={styles.addEquipmentLabel}
                            htmlFor="supported_containers">
                            <b>Obsługiwane pojemniki: </b>
                        </label>
                        <input
                            className={styles.addEquipmentInput}
                            type="text"
                            name="supported_containers"
                            maxLength={100}
                            placeholder="Np. butelki, puszki, kegi..."
                            onChange={handleChange}
                        />
                    </div>
                )}
                <button className={styles.insertDeviceButton} type="submit">
                    Dodaj urządzenie
                </button>
            </form>
        </div>
    );
};

export default AddDeviceForm;
