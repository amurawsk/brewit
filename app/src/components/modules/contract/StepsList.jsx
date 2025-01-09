import React, { useState } from 'react';
import styles from './StepsList.module.css';
import AddEditIngredient from './AddEditIngredient';
import AddEditStep from './AddEditStep';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';
import IngredientsList from './IngredientsList';

function StepsList({
    steps,
    stepIndex,
    ingredient,
    ingredientId,
    handleEditStep,
    handleAddEditIngredient,
    handleCancelAddEditIngredient,
    handleAddEditStep,
    handleCancelAddEditStep,
    handleDeleteStep,
    isEditingStep,
    isEditingIngredient,
    handleAddIngredient,
    handleEditIngredient,
    handleDeleteIngredient,
    isEditingRecipe,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [stepIndexToDelete, setStepIndexToDelete] = useState(null);

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const confirmDelete = () => {
        setIsModalOpen(false);
        handleDeleteStep(stepIndexToDelete);
        showNotification();
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleDeleteButton = (index) => {
        setStepIndexToDelete(index);
        setIsModalOpen(true);
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
                                    <span className={styles.recipeDescriptionValue}>
                                        {step.device}
                                    </span>
                                </span>
                                <span className={styles.recipeDescription}>
                                    Czas:{' '}
                                    <span className={styles.recipeDescriptionValue}>
                                        {step.time}
                                    </span>
                                </span>
                                <span className={styles.recipeDescription}>
                                    Opis:{' '}
                                    <span className={styles.recipeDescriptionValue}>
                                        {step.description}
                                    </span>
                                </span>
                                <IngredientsList
                                    ingredients={step.ingredients}
                                    handleEditIngredient={handleEditIngredient}
                                    stepIndex={index}
                                    handleDeleteIngredient={handleDeleteIngredient}
                                />
                            </div>
                            <div className={styles.addStepContainer}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEditStep(index)}
                                >
                                    Edytuj
                                </button>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => handleDeleteButton(index)}
                                >
                                    Usuń
                                </button>
                            </div>
                        </div>
                        {!isEditingIngredient && !isEditingStep && !isEditingRecipe && (
                            <button
                                className={styles.insertDeviceButton}
                                onClick={() => handleAddIngredient(index)}
                            >
                                Dodaj składnik
                            </button>
                        )}
                        {isEditingStep && stepIndex === index && (
                            <AddEditStep
                                stepIndex={stepIndex}
                                step={step}
                                handleSubmit={handleAddEditStep}
                                handleCancel={handleCancelAddEditStep}
                            />
                        )}
                        {isEditingIngredient && stepIndex === index && (
                            <AddEditIngredient
                                ingredientId={ingredientId}
                                ingredient={ingredient}
                                stepIndex={index}
                                step={step}
                                handleSubmit={handleAddEditIngredient}
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
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
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
