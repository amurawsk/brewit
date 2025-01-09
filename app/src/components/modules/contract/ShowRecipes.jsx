import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ShowRecipes.module.css';

import ConfirmModal from '../../utils/ConfirmModal';

const ShowRecipes = ({ recipes, openPanel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredientId, setIngredientId] = useState(null);

	const navigate = useNavigate();

	const handleEdit = (recipe) => {
		navigate('/contract/recipes/edit', { state: { recipe } });
	};

    const closePanel = () => {
        setIsModalOpen(false);
        setIngredientId(null);
    };

    const handleAction = (id) => {
        setIngredientId(id);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        console.log(ingredientId);
        closePanel();
    };

    const cancelAction = () => {
        closePanel();
    };

    return (
        <div className={styles.allRecipes}>
            {recipes.map((recipe, index) => (
                <div
                    className={styles.recipe}
                    key={index}
                    onClick={() => openPanel(recipe)}>
                    <div className={styles.recipeText}>
                        <span className={styles.recipeTextTitle}>
                            {recipe.name}
                        </span>
                        <span className={styles.recipeDescription}>
                            całkowity czas:
                            <span className={styles.recipeDescriptionValue}>
                                {' '}
                                {recipe.full_time}
                            </span>
                        </span>
                        <span className={styles.recipeDescription}>
                            całkowita objętość:
                            <span className={styles.recipeDescriptionValue}>
                                {' '}
                                {recipe.full_volume} L
                            </span>
                        </span>
                	</div>
					<div className={styles.buttonGroup}>
						<button
							className={styles.editButton}
							onClick={(event) => {
								event.stopPropagation();
								handleEdit(recipe);
							}}
						>
							Edytuj
						</button>
						<button
							className={styles.removeButton}
							onClick={(event) => {
								event.stopPropagation();
								handleAction(recipe.id);
							}}>
							Usuń
						</button>
					</div>
				</div>
            ))}
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć ten przepis?"
                    description="Spowoduje to usunięcie przypisanych zleceń" /*TODO what then */
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};
export default ShowRecipes;
