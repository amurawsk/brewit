import React, { useRef } from 'react';
import BasicRegistrationForm from './BasicRegistrationForm.js';
import api from '../../api.js';

function ContractForm({ formData, updateFormData, setActiveSection, handleRegister }) {
    const contractFormRef = useRef(null);
    const basicFormRef = useRef(null);

    const handleSubmission = async () => {
        const isBasicFormValid = basicFormRef.current.reportValidity();
        const isContractFormValid = contractFormRef.current.reportValidity();

        if (isBasicFormValid && isContractFormValid) {
            try {
                const payload = {
                    username: formData.username,
                    password: formData.password,
                    contract_brewery: {
                        name: formData.breweryName,
                        contract_phone_number: formData.phone,
                        contract_email: formData.email,
                        description: formData.description,
                        owner_name: formData.nameSurname,
                    },
                };

                const response = await api.post('register/contract/', payload);
                if (response.status === 201) {
                    handleRegister();
                }
                else {
                    console.log(response);
                    // TODO: Handle registration error
                }
            }
            catch (error) {
                return error.response;
            }
        }
    };

    return (
        <div className='myform-complex'>
            <BasicRegistrationForm ref={basicFormRef} formData={formData} updateFormData={updateFormData}/>
            <div className="myform-place">
                <div className="myform-toppart">
                    <h4>Podaj pozostałe dane</h4>
                    <hr className="divider" />
                    <div className="myform-form">
                        <form className="myform" ref={contractFormRef}>
                            <div>
                                <label>Imię i nazwisko właściciela</label>
                                <input type="text" placeholder="Podaj imię i nazwisko" value={formData.nameSurname} onChange={(e) => updateFormData('nameSurname', e.target.value)} required/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='myform-footer'>
                    <p className="disclaimer">Zatwierdzając, poświadczasz, że podane dane są prawdziwe</p>
                    <div className="button-group">
                        <button type="button" className="biglight-button" onClick={() => setActiveSection('ChooseType')}>Anuluj</button>
                        <button type="submit" className="bigdark-button" onClick={handleSubmission}>Zatwierdź</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContractForm;
