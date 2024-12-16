import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import NavigationBar from '../modules/NavigationBar.js';
import ContractForm from '../modules/ContractForm.js';
import CommercialForm from '../modules/CommercialForm.js';
import api from '../../api.js';

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

	const handleRegister = () => {
        console.log('Dane rejestracyjne:', formData);
        goToAboutUs();
    };

	const updateFormData = (field, value) => {
        setFormData(prevState => ({ ...prevState, [field]: value }));
    };

	const submitNamePassword = async () => {
		const username = formData.username;
		try {
			const response = await api.post('check-username-unique/', { username })
			if (response.data.unique) {
				setActiveSection('ChooseType');
			}
			else {
				// TODO: Handle non-unique username
			}
		}
		catch (error) {
			return error.response;
		}
	};

    return (
        <div className="register-page">
            <NavigationBar />
            <div className="page-wrapper">
                {activeSection === 'NamePassword' && (
				<div className='myform-place'>
					<h4>Zarejestruj się</h4>
					<hr className="divider" />
					<div className='myform-form'>
						<form className='myform' onSubmit={(e) => { e.preventDefault(); submitNamePassword(); }}>
    						<div>
        						<label htmlFor="username"><b>Nazwa użytkownika: </b></label>
        						<input type="text" placeholder="Wpisz nazwę użytkownika" name="name" value={formData.username} onChange={(e) => updateFormData('username', e.target.value)} required/>
    						</div>
    						<div>
        						<label htmlFor="password"><b>Hasło: </b></label>
        						<input type="password" placeholder="Wpisz hasło" name="password" value={formData.password} onChange={(e) => updateFormData('password', e.target.value)} required/>
    						</div>
							<div>
								<div className="chechbox-place">
										<input type="checkbox" checked={isChecked} onChange={(e) => setCheckbox(e.target.checked)} required/>
										<div className="checkbox-text">
											<label>Akceptuję regulamin serwisu </label>
											<p className="comment">Wymagane</p>
										</div>
								</div>
							</div>
    						<button className='bigdark-button' type="submit">Zarejestruj</button>
						</form>
					</div>
				</div>
				)}
				{activeSection === 'ChooseType' && (
					<div className='myform-place'>
						<h4>Wybierz typ browaru</h4>
						<hr className="divider" />
						<div className="register-buttongroup">
							<button onClick={() => setActiveSection('Contract')} className="smalllight-button">Mam browar kontraktowy</button>
							<button onClick={() => setActiveSection('Commercial')} className="smalldark-button">Mam browar komercyjny</button>
						</div>
					</div>
                )}
                {activeSection === 'Contract' && <ContractForm formData={formData} updateFormData={updateFormData} setActiveSection={setActiveSection} handleRegister={handleRegister} />}
                {activeSection === 'Commercial' && <CommercialForm formData={formData} updateFormData={updateFormData} setActiveSection={setActiveSection} handleRegister={handleRegister} />}
            </div>
        </div>
    );
}

export default Register;
