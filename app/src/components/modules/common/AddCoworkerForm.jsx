import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './AddCoworkerForm.module.css';

import api from '../../../api.js';

/**
 * AddCoworkerForm - similar to login page - has username and password fields
 */
const AddCoworkerForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post(`coworkers/create/`, {
                coworker_username: formData.username,
                coworker_password: formData.password,
            });
            if (response.status === 201) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.error('Error:', response);
                alert('Błąd podczas dodawania pracownika!');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching devices:', error);
            alert('Błąd sieci! Spróbuj ponownie później.');
        }

        if (localStorage.getItem('userType') === 'commercial_brewery') {
            navigate('/commercial/coworkers');
        } else if (localStorage.getItem('userType') === 'contract_brewery') {
            navigate('/contract/coworkers');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <form className={styles.addCoworkerForm} onSubmit={handleSubmit}>
                <label className={styles.addCoworkerLabel} htmlFor="name">
                    <b>Nazwa użytkownika: </b>
                </label>
                <input
                    className={styles.addCoworkerInput}
                    type="text"
                    name="username"
                    maxLength={100}
                    value={formData.username}
                    placeholder="Wpisz nazwę użytkownika"
                    onChange={handleChange}
                    required
                />
                <label className={styles.addCoworkerLabel} htmlFor="password">
                    <b>Hasło: </b>
                </label>
                <input
                    className={styles.addCoworkerInput}
                    type="password"
                    name="password"
                    maxLength={100}
                    value={formData.password}
                    placeholder="Wpisz hasło"
                    onChange={handleChange}
                    required
                />
                <button className={styles.addCoworkerButton} type="submit">
                    Dodaj konto
                </button>
            </form>
        </div>
    );
};

export default AddCoworkerForm;
