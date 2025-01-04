import React, { forwardRef } from 'react';
import styles from './BasicRegistrationForm.module.css';

const BasicRegistrationForm = forwardRef(
    ({ formData, updateFormData }, ref) => {
        return (
            <div>
                <div className={styles.myformPlace}>
                    <h4>Podaj podstawowe dane</h4>
                    <hr className={styles.divider}/>
                    <div className={styles.myformForm}>
                        <form className={styles.myform} ref={ref}>
                            <div>
                                <label>Nazwa browaru</label>
                                <input
                                    type="text"
                                    placeholder="Podaj nazwę"
                                    value={formData.breweryName}
                                    onChange={(e) =>
                                        updateFormData(
                                            'breweryName',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Email kontaktowy</label>
                                <input
                                    type="email"
                                    placeholder="Podaj email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        updateFormData('email', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label>Telefon kontaktowy</label>
                                <input
                                    type="text"
                                    placeholder="Podaj numer"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        updateFormData('phone', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className={styles.description}>
                                <label>Opis (opcjonalne)</label>
                                <input
                                    placeholder="Podaj opis swojego browaru"
                                    value={formData.description}
                                    onChange={(e) =>
                                        updateFormData(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
);

export default BasicRegistrationForm;
