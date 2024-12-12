import React, { useRef } from 'react';
import BasicRegistrationForm from './BasicRegistrationForm.js';

function ContractForm({ formData, updateFormData, setActiveSection, handleRegister }) {
    const contractFormRef = useRef(null);
    const basicFormRef = useRef(null);

    const handleSubmission = () => {
        const isBasicFormValid = basicFormRef.current.reportValidity();
        const isContractFormValid = contractFormRef.current.reportValidity();

        if (isBasicFormValid && isContractFormValid) {
            handleRegister();
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
