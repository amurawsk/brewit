import React, { useRef } from 'react';
import BasicRegistrationForm from './BasicRegistrationForm.js';
import api from '../../api.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants.js';

function CommercialForm({
    formData,
    updateFormData,
    setActiveSection,
    handleRegister,
}) {
    const commercialFormRef = useRef(null);
    const basicFormRef = useRef(null);

    const handleSubmission = async () => {
        const isBasicFormValid = basicFormRef.current.reportValidity();
        const isCommercialFormValid =
            commercialFormRef.current.reportValidity();

        if (isBasicFormValid && isCommercialFormValid) {
            try {
                const payload = {
                    username: formData.username,
                    password: formData.password,
                    commercial_brewery: {
                        name: formData.breweryName,
                        contract_phone_number: formData.phone,
                        contract_email: formData.email,
                        description: formData.description,
                        nip: formData.nip,
                        address: formData.address,
                    },
                };

                const response = await api.post(
                    'register/commercial/',
                    payload
                );
                if (response.status === 201) {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                    localStorage.setItem('userType', response.data.user_type);
                    handleRegister();
                } else {
                    console.log(response);
                    // TODO: Handle registration error
                }
            } catch (error) {
                return error.response;
            }
        }
    };

    return (
        <div className="myform-complex">
            <BasicRegistrationForm
                ref={basicFormRef}
                formData={formData}
                updateFormData={updateFormData}
            />
            <div className="myform-place">
                <div className="myform-toppart">
                    <h4>Podaj pozostałe dane</h4>
                    <hr className="divider" />
                    <div className="myform-form">
                        <form className="myform" ref={commercialFormRef}>
                            <div>
                                <label>NIP</label>
                                <input
                                    type="text"
                                    placeholder="Podaj NIP"
                                    value={formData.nip}
                                    onChange={(e) =>
                                        updateFormData('nip', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Adres</label>
                                <input
                                    type="text"
                                    placeholder="Podaj adres"
                                    value={formData.address}
                                    onChange={(e) =>
                                        updateFormData(
                                            'address',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="myform-footer">
                    <p className="disclaimer">
                        Zatwierdzając, poświadczasz, że podane dane są prawdziwe
                    </p>
                    <div className="button-group">
                        <button
                            type="button"
                            className="biglight-button"
                            onClick={() => setActiveSection('ChooseType')}>
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="bigdark-button"
                            onClick={handleSubmission}>
                            Zatwierdź
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommercialForm;
