import React, { useState } from 'react';

import styles from './ShowRecipes.module.css';

import ConfirmModal from '../../utils/ConfirmModal';

const ShowRecipes = ({ recipes, openPanel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const closePanel = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        console.log(deleteId);
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
                                {recipe.full_volume}
                            </span>
                        </span>
                    </div>
                    <button
                        className={styles.removeButton}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleAction(recipe.id);
                        }}>
                        Usuń
                    </button>
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
