import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AddCoworkerForm.module.css';

const AddCoworkerForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            username: '',
            password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.username, formData.password);
        navigate('/commercial/coworkers');
        // TODO mock

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <form className={styles.addCoworkerForm} onSubmit={handleSubmit}>
                <label
                    className={styles.addCoworkerLabel}
                    htmlFor="name">
                    <b>Nazwa użytkownika: </b>
                </label>
                <input
                    className={styles.addCoworkerInput}
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Wpisz nazwę użytkownika"
                    onChange={handleChange}
                    required
                />
                <label
                    className={styles.addCoworkerLabel}
                    htmlFor="password">
                    <b>Hasło: </b>
                </label>
                <input
                    className={styles.addCoworkerInput}
                    type="text"
                    name="password"
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
    )
}

export default AddCoworkerForm;
