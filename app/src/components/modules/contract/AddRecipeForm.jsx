import React, { useState } from 'react';
import styles from './AddRecipeForm.module.css';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        full_time: '',
        full_volume: '',
        steps: [],
    });
    const [isEditingRecipe, setIsEditingRecipe] = useState(false);
    const [isEditingStep, setIsEditingStep] = useState(false);
    const [newStep, setNewStep] = useState({
        name: '',
        device: '',
        time: '',
        description: '',
        ingredients: [],
    });
    const [currentEditingStepIndex, setCurrentEditingStepIndex] = useState(null);
    const [newIngredient, setNewIngredient] = useState({
        name: '',
        quantity: '',
    });
    const [showIngredientForm, setShowIngredientForm] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStepChange = (e) => {
        const { name, value } = e.target;
        setNewStep((prevStep) => ({
            ...prevStep,
            [name]: value,
        }));
    };

    const handleIngredientChange = (e) => {
        const { name, value } = e.target;
        setNewIngredient((prevIngredient) => ({
            ...prevIngredient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditingRecipe(false);
    };

    const handleEditRecipe = () => {
        setIsEditingRecipe(true);
    };

    const handleEditStep = (index) => {
        const stepToEdit = formData.steps[index];
        setNewStep(stepToEdit);
        setCurrentEditingStepIndex(index);
        setIsEditingStep(true);
    };

    const updateStep = () => {
        if (newStep.name && newStep.device && newStep.time) {
            const updatedSteps = [...formData.steps];
            updatedSteps[currentEditingStepIndex] = newStep;
            setFormData((prevData) => ({
                ...prevData,
                steps: updatedSteps,
            }));

            setNewStep({ name: '', device: '', time: '', description: '', ingredients: [] });
            setIsEditingStep(false);
            setCurrentEditingStepIndex(null);
        }
    };

    const addStep = () => {
        if (newStep.name && newStep.device && newStep.time) {
            setFormData((prevData) => ({
                ...prevData,
                steps: [...prevData.steps, newStep],
            }));

            setNewStep({ name: '', device: '', time: '', description: '', ingredients: [] });
            setIsEditingStep(false);
        }
    };

    const handleEditIngredient = (stepIndex, ingredientIndex) => {
        const ingredientToEdit = formData.steps[stepIndex].ingredients[ingredientIndex];
        setNewIngredient(ingredientToEdit);
        setShowIngredientForm(stepIndex);
        setCurrentEditingStepIndex(stepIndex);
        setDeleteId(ingredientIndex);
    };

    const addIngredient = (stepIndex) => {
        if (newIngredient.name && newIngredient.quantity) {
            const updatedSteps = [...formData.steps];
            if (deleteId !== null) {
                updatedSteps[stepIndex].ingredients[deleteId] = newIngredient;
            } else {
                updatedSteps[stepIndex].ingredients.push(newIngredient);
            }

            setFormData((prevData) => ({
                ...prevData,
                steps: updatedSteps,
            }));

            setNewIngredient({ name: '', quantity: '' });
            setShowIngredientForm(null);
            setDeleteId(null);
        }
    };

    const { name, full_time, full_volume, steps } = formData;

    return (
        <div>
            {name && full_time && full_volume && !isEditingRecipe && (
                <div className={styles.recipe}>
                    <div className={styles.recipeText}>
                        <span className={styles.recipeTextTitle}>Nazwa przepisu: {name}</span>
                        <span className={styles.recipeDescription}>
                            Całkowity czas:
                            <span className={styles.recipeDescriptionValue}>{' '}{full_time}</span>
                        </span>
                        <span className={styles.recipeDescription}>
                            Całkowita objętość:
                            <span className={styles.recipeDescriptionValue}>{' '}{full_volume} L</span>
                        </span>
                    </div>
                    <button className={styles.removeButton} onClick={handleEditRecipe}>Edytuj</button>
                </div>
            )}

            {(isEditingRecipe || !name || !full_time || !full_volume) && (
                <form className={styles.addDeviceForm} onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.addEquipmentLabel} htmlFor="name">
                            <b>Nazwa przepisu: </b>
                        </label>
                        <input
                            className={styles.addEquipmentInput}
                            type="text"
                            name="name"
                            maxLength={100}
                            placeholder="Wpisz nazwę przepisu"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.addEquipmentLabel} htmlFor="full_time">
                            <b>Całkowity czas: </b>
                        </label>
                        <input
                            className={styles.addEquipmentInput}
                            type="text"
                            name="full_time"
                            maxLength={100}
                            placeholder="Wpisz całkowity czas"
                            value={full_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.addEquipmentLabel} htmlFor="full_volume">
                            <b>Całkowita objętość (L): </b>
                        </label>
                        <input
                            className={styles.addEquipmentInput}
                            type="number"
                            name="full_volume"
                            min="0"
                            step="0.1"
                            placeholder="Wpisz całkowitą objętość"
                            value={full_volume}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className={styles.insertDeviceButton} type="submit">
                        {name ? 'Zaktualizuj' : 'Dodaj przepis'}
                    </button>
                </form>
            )}

            {name && full_time && full_volume && !isEditingRecipe && !isEditingStep && (
                <div className={styles.addStepContainer}>
                    <button className={styles.insertDeviceButton} onClick={() => setIsEditingStep(true)}>
                        Dodaj etap
                    </button>
                </div>
            )}

            {(isEditingStep && currentEditingStepIndex === null) && (
                <div className={styles.addDeviceForm}>
                    <h3>Dodaj etap</h3>
                    <label className={styles.addEquipmentLabel} htmlFor="name">
                        <b>Nazwa etapu: </b>
                    </label>
                    <input
                        className={styles.addEquipmentInput}
                        type="text"
                        name="name"
                        placeholder="Nazwa etapu"
                        value={newStep.name}
                        onChange={handleStepChange}
                    />
                    <label className={styles.addEquipmentLabel} htmlFor="device">
                        <b>Typ urządzenia: </b>
                    </label>
                    <select
						className={styles.dropboxInput}
						name="device"
						value={newStep.device}
						onChange={handleStepChange}
					>
						<option value="" disabled>
							Wybierz typ
						</option>
						<option value="Tank Warzelny">Tank Warzelny</option>
						<option value="Pojemnik fermentacyjny">Pojemnik fermentacyjny</option>
						<option value="Kocioł do leżakowania">Kocioł do leżakowania</option>
						<option value="Urządzenie do rozlewania">Urządzenie do rozlewania</option>
					</select>

                    <label className={styles.addEquipmentLabel} htmlFor="time">
                        <b>Czas: </b>
                    </label>
                    <input
                        className={styles.addEquipmentInput}
                        type="text"
                        name="time"
                        placeholder="Czas"
                        value={newStep.time}
                        onChange={handleStepChange}
                    />
                    <label className={styles.addEquipmentLabel} htmlFor="description">
                        <b>Opis etapu: </b>
                    </label>
                    <input
                        className={styles.addEquipmentInput}
                        name="description"
                        placeholder="Opis etapu"
                        value={newStep.description}
                        onChange={handleStepChange}
                    />
                    <button className={styles.insertDeviceButton} type="button" onClick={addStep}>
                        Dodaj etap
                    </button>
                </div>
            )}

            {steps.length > 0 && (
                <div className={styles.stepsList}>
                    <h3>Etapy przepisu:</h3>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <div className={styles.recipe}>
                                <div className={styles.recipeText}>
                                    <span className={styles.recipeTextTitle}>Nazwa etapu: {step.name}</span>
                                    <span className={styles.recipeDescription}>
                                        Urządzenie: <span className={styles.recipeDescriptionValue}>{step.device}</span>
                                    </span>
                                    <span className={styles.recipeDescription}>
                                        Czas: <span className={styles.recipeDescriptionValue}>{step.time}</span>
                                    </span>
                                    <span className={styles.recipeDescription}>
                                        Opis: <span className={styles.recipeDescriptionValue}>{step.description}</span>
                                    </span>
                                    <div>
                                        <h4>Składniki:</h4>
                                        {step.ingredients.map((ingredient, idx) => (
                                            <div key={idx} className={styles.recipe}>
                                                <div className={styles.recipeText}>
                                                    <span className={styles.recipeTextTitle}>Nazwa składnika: {ingredient.name}</span>
                                                    <span className={styles.recipeDescription}>
                                                        Ilość: <span className={styles.recipeDescriptionValue}>{ingredient.quantity}</span>
                                                    </span>
                                                </div>
                                                <div className={styles.addStepContainer}>
                                                    <button className={styles.removeButton} onClick={() => handleEditIngredient(index, idx)}>
                                                        Edytuj
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.addStepContainer}>
                                    <button className={styles.removeButton} onClick={() => handleEditStep(index)}>
                                        Edytuj
                                    </button>
                                </div>
                            </div>
                            <button
                                className={styles.insertDeviceButton}
                                onClick={() => setShowIngredientForm(index === showIngredientForm ? null : index)}
                            >
                                Dodaj składnik
                            </button>
                            {showIngredientForm === index && (
                                <div className={styles.addDeviceForm}>
                                    <h4>{deleteId !== null ? 'Edytuj składnik' : 'Dodaj składnik'}</h4>
                                    <label className={styles.addEquipmentLabel} htmlFor="name">
                                        <b>Nazwa składnika: </b>
                                    </label>
                                    <input
                                        className={styles.addEquipmentInput}
                                        type="text"
                                        name="name"
                                        placeholder="Nazwa składnika"
                                        value={newIngredient.name}
                                        onChange={handleIngredientChange}
                                    />
                                    <label className={styles.addEquipmentLabel} htmlFor="quantity">
                                        <b>Ilość: </b>
                                    </label>
                                    <input
                                        className={styles.addEquipmentInput}
                                        type="text"
                                        name="quantity"
                                        placeholder="Ilość"
                                        value={newIngredient.quantity}
                                        onChange={handleIngredientChange}
                                    />
                                    <button
                                        className={styles.insertDeviceButton}
                                        onClick={() => addIngredient(showIngredientForm)}
                                    >
                                        {deleteId !== null ? 'Zaktualizuj składnik' : 'Dodaj składnik'}
                                    </button>
                                </div>
                            )}
                            {(isEditingStep && currentEditingStepIndex === index) && (
                                <div className={styles.addDeviceForm}>
                                    <h3>Edytuj etap</h3>
                                    <label className={styles.addEquipmentLabel} htmlFor="name">
                                        <b>Nazwa etapu: </b>
                                    </label>
                                    <input
                                        className={styles.addEquipmentInput}
                                        type="text"
                                        name="name"
                                        placeholder="Nazwa etapu"
                                        value={newStep.name}
                                        onChange={handleStepChange}
                                    />
                                    <label className={styles.addEquipmentLabel} htmlFor="device">
                                        <b>Typ urządzenia: </b>
                                    </label>
                                    <select
                                        className={styles.dropboxInput}
                                        name="device"
                                        value={newStep.device}
                                        onChange={handleStepChange}
                                    >
                                        <option value="">Wybierz urządzenie</option>
                                        <option value="Urządzenie A">Urządzenie A</option>
                                        <option value="Urządzenie B">Urządzenie B</option>
                                    </select>
                                    <label className={styles.addEquipmentLabel} htmlFor="time">
                                        <b>Czas: </b>
                                    </label>
                                    <input
                                        className={styles.addEquipmentInput}
                                        type="text"
                                        name="time"
                                        placeholder="Czas"
                                        value={newStep.time}
										onChange={handleStepChange}
                    				/>
                    				<label className={styles.addEquipmentLabel} htmlFor="description">
                        				<b>Opis etapu: </b>
                    				</label>
									<input
										className={styles.addEquipmentInput}
										name="description"
										placeholder="Opis etapu"
										value={newStep.description}
										onChange={handleStepChange}
									/>
									<button className={styles.insertDeviceButton} type="button" onClick={updateStep}>
										Zaktualizuj etap
									</button>
                				</div>
            				)}
						</div>
        			))}
    			</div>
			)} 
        </div>
    );
};

export default AddRecipeForm;
