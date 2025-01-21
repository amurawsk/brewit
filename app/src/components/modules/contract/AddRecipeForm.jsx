import React, { useState } from 'react';
import styles from './AddRecipeForm.module.css';
import Recipe from './Recipe';
import AddEditRecipe from './AddEditRecipe';
import AddEditStep from './AddEditStep';
import StepsList from './StepsList';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = ({ recipe }) => {

	const navigate = useNavigate();
    const goToRecipes = () => navigate('/contract/recipes');

    const [formData, setFormData] = useState(
        recipe || {
            name: '',
            full_volume: '',
            steps: [],
        }
    );

    const [isEditingRecipe, setIsEditingRecipe] = useState(!recipe?.name);

    const [step, setStep] = useState({
		pk: '',
        name: '',
        device_type: '',
        time: '',
        description: '',
        ingredients: [],
    });

    const [isEditingStep, setIsEditingStep] = useState(false);
    const [stepIndex, setStepIndex] = useState(null);

    const handleEditStep = (index) => {
        setIsEditingStep(true);
        setStepIndex(index);
        setStep(formData.steps[index]);
    };

    const handleAddEditStep = (newStep, stepIndex) => {
        if (stepIndex === null) {
            setFormData((prevState) => ({
                ...prevState,
                steps: [...prevState.steps, newStep],
            }));
        } else {
            const updatedSteps = [...formData.steps];
            updatedSteps[stepIndex] = newStep;
            setFormData((prevState) => ({
                ...prevState,
                steps: updatedSteps,
            }));
        }

        setStep({
			pk: '',
            name: '',
            device_type: '',
            time: '',
            description: '',
            ingredients: [],
        });
        setIsEditingStep(false);
        setStepIndex(null);
    };

    const handleCancelAddEditStep = () => {
        setIsEditingStep(false);
        setStepIndex(null);
        setStep({
			pk: '',
            name: '',
            devic_type: '',
            time: '',
            description: '',
            ingredients: [],
        });
    };

    const [isEditingIngredient, setIsEditingIngredient] = useState(false);
    const [ingredientId, setIngredientId] = useState(null);

    const [ingredient, setIngredient] = useState({
        name: '',
        amount: '',
    });

    const handleEditIngredient = (index, idx) => {
        setIsEditingIngredient(true);
        setStepIndex(index);
        setIngredientId(idx);
        setIngredient(formData.steps[index].ingredients[idx]);
        setStep(formData.steps[stepIndex]);
    };

    const handleAddIngredient = (index) => {
        setIsEditingIngredient(true);
        setStepIndex(index);
        setStep(formData.steps[stepIndex]);
    };

    const handleAddEditIngredient = (
        newIngredient,
        ingredientId,
        stepIndex
    ) => {
        if (ingredientId === null) {
            formData.steps[stepIndex].ingredients.push(newIngredient);
        } else {
            formData.steps[stepIndex].ingredients[ingredientId] = newIngredient;
        }
        setIngredient({
            name: '',
            amount: '',
        });
        setStep(formData.steps[stepIndex]);
        setIsEditingIngredient(false);
        setIngredientId(null);
    };

    const handleCancelAddEditIngredient = () => {
        setIsEditingIngredient(false);
        setStepIndex(null);
        setIngredientId(null);
        setIngredient({
            name: '',
            amount: '',
        });
    };

    return (
        <div>
            {!isEditingRecipe && (
                <Recipe
                    recipe={formData}
                    handleEditRecipe={() => setIsEditingRecipe(true)}
                />
            )}

            {isEditingRecipe && (
                <AddEditRecipe
                    recipe={formData}
                    setRecipe={setFormData}
					handleCancel={() => setIsEditingRecipe(false)}
                />
            )}

            {formData &&
                !isEditingRecipe &&
                !isEditingStep &&
                !isEditingIngredient && (
                    <div className={styles.addStepContainer}>
                        <button
                            className={styles.insertDeviceButton}
                            onClick={() => setIsEditingStep(true)}>
                            Dodaj etap
                        </button>
                    </div>
                )}

            {isEditingStep && stepIndex === null && (
                <AddEditStep
					recipe_id={recipe.pk}
                    step={step}
					setStep={setStep}
					handleAddEditStep={handleAddEditStep}
                    handleCancel={handleCancelAddEditStep}
                />
            )}

            {formData.steps.length > 0 && (
                <StepsList
                    steps={formData.steps}
					Step={step}
					setStep={setStep}
					handleEditStep={handleEditStep}
					handleCancel={handleCancelAddEditStep}
                    stepIndex={stepIndex}
                    ingredient={ingredient}
                    setIngredient={setIngredient}
                    isEditingStep={isEditingStep}
                    handleAddEditStep={handleAddEditStep}
                    handleCancelAddEditStep={handleCancelAddEditStep}
                    isEditingIngredient={isEditingIngredient}
                    handleAddIngredient={handleAddIngredient}
                    handleAddEditIngredient={handleAddEditIngredient}
                    handleCancelAddEditIngredient={
                        handleCancelAddEditIngredient
                    }
                    handleEditIngredient={handleEditIngredient}
                    isEditingRecipe={isEditingRecipe}
                />
            )}
        </div>
    );
};

export default AddRecipeForm;
