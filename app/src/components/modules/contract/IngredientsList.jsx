import React, { useState } from 'react';
import styles from './IngredientsList.module.css';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';

function IngredientsList({
    ingredients,
    handleEditIngredient,
    stepIndex,
    handleDeleteIngredient,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [ingredientIndexToDelete, setIngredientIndexToDelete] = useState(null);

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const confirmDelete = () => {
        setIsModalOpen(false);
        handleDeleteIngredient(stepIndex, ingredientIndexToDelete);
        showNotification();
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleDeleteButton = (idx) => {
        setIngredientIndexToDelete(idx);
        setIsModalOpen(true);
    };

    return (
        <div>
            <h4>Składniki:</h4>
            {ingredients.map((ingredient, idx) => (
                <div key={idx} className={styles.recipe}>
                    <div className={styles.recipeText}>
                        <span className={styles.recipeTextTitle}>
                            Nazwa składnika: {ingredient.name}
                        </span>
                        <span className={styles.recipeDescription}>
                            Ilość:{' '}
                            <span className={styles.recipeDescriptionValue}>
                                {ingredient.quantity}
                            </span>
                        </span>
                    </div>
                    <div className={styles.addStepContainer}>
                        <button
                            className={styles.editButton}
                            onClick={() => handleEditIngredient(stepIndex, idx)}
                        >
                            Edytuj
                        </button>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleDeleteButton(idx)}
                        >
                            Usuń
                        </button>
                    </div>
                </div>
            ))}
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

export default IngredientsList;
