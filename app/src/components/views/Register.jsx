import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../modules/NavigationBar.jsx';
import ContractForm from '../modules/ContractForm.jsx';
import CommercialForm from '../modules/CommercialForm.jsx';
import api from '../../api.js';
import styles from './Register.module.css';

function Register() {
    const navigate = useNavigate();

    const goToAboutUs = () => navigate('/');

    const [activeSection, setActiveSection] = useState('NamePassword');
    const [isChecked, setCheckbox] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        breweryName: '',
        email: '',
        phone: '',
        description: '',
        nip: '',
        address: '',
        nameSurname: '',
    });
	const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        console.log('Dane rejestracyjne:', formData);
        goToAboutUs();
    };

    const updateFormData = (field, value) => {
        setFormData((prevState) => ({ ...prevState, [field]: value }));
    };

    const submitNamePassword = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        const username = formData.username;
        try {
            const response = await api.post('check-username-unique/', {
                username,
            });
            if (response.data.unique) {
                setActiveSection('ChooseType');
            } else {
                console.log(response);
				setErrorMessage('Ta nazwa jest już zajęta');
            }
        } catch (error) {
            return error.response;
        }
    };

    return (
        <div className={styles.registerPage}>
            <NavigationBar />
            <div className={styles.pageWrapper}>
                {activeSection === 'NamePassword' && (
                    <div className={styles.myformPlace}>
                        <h4>Zarejestruj się</h4>
                        <hr className={styles.divider}/>
                        <div className={styles.myformForm}>
                            <form
                                className={styles.myform}
                                onSubmit={submitNamePassword}>
                                <div>
                                    <label htmlFor="username">
                                        <b>Nazwa użytkownika: </b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Wpisz nazwę użytkownika"
                                        name="name"
                                        value={formData.username}
                                        onChange={(e) =>
                                            updateFormData(
                                                'username',
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">
                                        <b>Hasło: </b>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Wpisz hasło"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            updateFormData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
								<div className={styles.errorMessage}>{errorMessage}</div>
                                <div>
                                    <div className={styles.checkboxPlace}>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) =>
                                                setCheckbox(e.target.checked)
                                            }
                                            required
                                        />
                                        <div className={styles.checkboxText}>
                                            <label>
                                                Akceptuję regulamin serwisu{' '}
                                            </label>
                                            <p className={styles.comment}>Wymagane</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={styles.bigDarkButton}
                                    type="submit">
                                    Zarejestruj
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {activeSection === 'ChooseType' && (
                    <div className={styles.myformPlace}>
                        <h4>Wybierz typ browaru</h4>
                        <hr className={styles.divider}/>
                        <div className={styles.registerButtonGroup}>
                            <button
                                onClick={() => setActiveSection('Contract')}
                                className={styles.smallLightButton}>
                                Mam browar kontraktowy
                            </button>
                            <button
                                onClick={() => setActiveSection('Commercial')}
                                className={styles.smallDarkButton}>
                                Mam browar komercyjny
                            </button>
                        </div>
                    </div>
                )}
                {activeSection === 'Contract' && (
                    <ContractForm
                        formData={formData}
                        updateFormData={updateFormData}
                        setActiveSection={setActiveSection}
                        handleRegister={handleRegister}
                    />
                )}
                {activeSection === 'Commercial' && (
                    <CommercialForm
                        formData={formData}
                        updateFormData={updateFormData}
                        setActiveSection={setActiveSection}
                        handleRegister={handleRegister}
                    />
                )}
            </div>
        </div>
    );
}

export default Register;
