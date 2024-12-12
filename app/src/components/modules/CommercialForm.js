import React, { useRef } from 'react';
import BasicRegistrationForm from './BasicRegistrationForm.js';

function CommercialForm({ formData, updateFormData, setActiveSection, handleRegister }) {
    const commercialFormRef = useRef(null);
    const basicFormRef = useRef(null);

    const handleSubmission = () => {
        const isBasicFormValid = basicFormRef.current.reportValidity();
        const isCommercialFormValid = commercialFormRef.current.reportValidity();

        if (isBasicFormValid && isCommercialFormValid) {
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
                        <form className="myform" ref={commercialFormRef}>
                            <div>
                                <label>NIP</label>
                                <input type="text" placeholder="Podaj NIP" value={formData.nip} onChange={(e) => updateFormData('nip', e.target.value)} required/>
                            </div>
                            <div>
                                <label>Adres</label>
                                <input type="text" placeholder="Podaj adres" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} required/>
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

export default CommercialForm;
