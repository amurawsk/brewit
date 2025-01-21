import React, { useState } from 'react';
import styles from './StepsList.module.css';
import AddEditIngredient from './AddEditIngredient';
import AddEditStep from './AddEditStep';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';
import IngredientsList from './IngredientsList';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

function StepsList({
    steps,
	Step,
	setStep,
    stepIndex,
    ingredient,
    setIngredient,
    handleEditStep,
    handleAddEditIngredient,
    handleCancelAddEditIngredient,
    handleAddEditStep,
    handleCancelAddEditStep,
    isEditingStep,
    isEditingIngredient,
    handleAddIngredient,
    handleEditIngredient,
    isEditingRecipe,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
	const navigate = useNavigate();
	const goToRecipes = () => navigate('/contract/recipes');


    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = async () => {
		const removeRecipe = async () => {
            try {
				const response = await api.post(`recipies/stages/delete`, {
					stage_id: deleteId,
				});
                if (response.status === 200) {
                    goToRecipes();
                }
            } catch (error) {
				console.log(error);
            }
        };
		removeRecipe();
        cancelAction();
		showNotification();
    };

    const cancelAction = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };


    return (
        <div>
            <div className={styles.stepsList}>
                <h3>Etapy przepisu:</h3>
                {steps.map((step, index) => (
                    <div key={index}>
                        <div className={styles.recipe}>
                            <div className={styles.recipeText}>
                                <span className={styles.recipeTextTitle}>
                                    Nazwa etapu: {step.name}
                                </span>
                                <span className={styles.recipeDescription}>
                                    Urządzenie:{' '}
                                    <span
                                        className={
                                            styles.recipeDescriptionValue
                                        }>
                                        {step.device_type}
                                    </span>
                                </span>
                                <span className={styles.recipeDescription}>
                                    Czas:{' '}
                                    <span
                                        className={
                                            styles.recipeDescriptionValue
                                        }>
                                        {step.time}
                                    </span>
                                </span>
                                <span className={styles.recipeDescription}>
                                    Opis:{' '}
                                    <span
                                        className={
                                            styles.recipeDescriptionValue
                                        }>
                                        {step.description}
                                    </span>
                                </span>
                                <IngredientsList
                                    ingredients={step.ingredients}
                                    handleEditIngredient={handleEditIngredient}
                                    stepIndex={index}
                                />
                            </div>
                            <div className={styles.addStepContainer}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEditStep(index)}>
                                    Edytuj
                                </button>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => handleAction(step.pk)}>
                                    Usuń
                                </button>
                            </div>
                        </div>
                        {!isEditingIngredient &&
                            !isEditingStep &&
                            !isEditingRecipe && (
                                <button
                                    className={styles.insertDeviceButton}
                                    onClick={() => handleAddIngredient(index)}>
                                    Dodaj składnik
                                </button>
                            )}
                        {isEditingStep && stepIndex === index && (
                            <AddEditStep
							step={step}
							setStep={setStep}
							handleAddEditStep={handleAddEditStep}
							handleCancel={handleCancelAddEditStep}
                            />
                        )}
                        {isEditingIngredient && stepIndex === index && (
                            <AddEditIngredient
								stage_id={step.pk}
								ingredient={ingredient}
								setIngredient={setIngredient}
								handleCancel={handleCancelAddEditIngredient}
                            />
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć ten etap?"
                    description="Spowoduje to usunięcie przypisanych składników."
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}

            <Notification
                message="Operacja zakończona sukcesem!"
                isVisible={isNotificationVisible}
            />
        </div>
    );
}

export default StepsList;
