import React, { useState } from 'react';
import styles from './IngredientsList.module.css';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';
import api from '../../../api.js';
import { useNavigate } from 'react-router-dom';

function IngredientsList({
    ingredients,
    handleEditIngredient,
    stepIndex,
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
				const response = await api.post(`recipies/stages/ingredients/delete`, {
					ingredient_id: deleteId,
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
                                {ingredient.amount}
                            </span>
                        </span>
                    </div>
                    <div className={styles.addStepContainer}>
                        <button
                            className={styles.editButton}
                            onClick={() =>
                                handleEditIngredient(stepIndex, idx)
                            }>
                            Edytuj
                        </button>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleAction(ingredient.pk)}>
                            Usuń
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć ten składnik?"
                    description=""
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

export default IngredientsList;
