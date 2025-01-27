import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ShowRecipes.module.css';

import ConfirmModal from '../../utils/ConfirmModal';
import api from '../../../api.js';

const ShowRecipes = ({ recipes, openPanel }) => {
	console.log(recipes)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (recipe) => {
        navigate('/contract/recipes/edit', { state: { recipe } });
    };

    const goToRecipes = () => navigate('/contract/recipes');

    const closePanel = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = async () => {
		const removeRecipe = async () => {
            try {
				const response = await api.post(`recipies/delete/`, {
					id: deleteId,
				});
                if (response.status === 200) {
                    goToRecipes();
                } else {
                    console.log("Nie usunieto");
                }
            } catch (error) {
				console.log(error);
            }
        };
		removeRecipe();
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
                                {recipe.full_time} dni
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
                            }}>
                            Edytuj
                        </button>
                        <button
                            className={styles.removeButton}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleAction(recipe.pk);
                            }}>
                            Usuń
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć ten przepis?"
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};
export default ShowRecipes;
