import React, { useState } from 'react';
import styles from './Recipe.module.css';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';

function Recipe({ recipe, handleEditRecipe, handleDeleteRecipe }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const confirmDelete = () => {
        setIsModalOpen(false);
        handleDeleteRecipe();
        showNotification();
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className={styles.recipe}>
                <div className={styles.recipeText}>
                    <span className={styles.recipeTextTitle}>
                        Nazwa przepisu: {recipe.name}
                    </span>
                    <span className={styles.recipeDescription}>
                        Całkowity czas:
                        <span className={styles.recipeDescriptionValue}>
                            {' '}
                            {recipe.full_time}
                        </span>
                    </span>
                    <span className={styles.recipeDescription}>
                        Całkowita objętość:
                        <span className={styles.recipeDescriptionValue}>
                            {' '}
                            {recipe.full_volume} L
                        </span>
                    </span>
                </div>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.editButton}
                        onClick={() => handleEditRecipe()}>
                        Edytuj
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={() => setIsModalOpen(true)}>
                        Usuń
                    </button>
                </div>
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

export default Recipe;
