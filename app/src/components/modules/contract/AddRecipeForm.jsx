import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddRecipeForm.module.css';
import Recipe from './Recipe';
import AddEditRecipe from './AddEditRecipe';
import AddEditStep from './AddEditStep';
import StepsList from './StepsList';

const AddRecipeForm = ({ recipe, isEditing }) => {
    const navigate = useNavigate();

    const goToAddRecipe = () => {
        navigate('/contract/recipes/add');
    };

    const [formData, setformData] = useState(
        recipe || {
            name: '',
            full_time: '',
            full_volume: '',
            steps: [],
        }
    );

    const [isEditingRecipe, setIsEditingRecipe] = useState(isEditing);

    const handleEditRecipe = () => {
        setIsEditingRecipe(true);
    };

    const handleAddEditRecipe = (newRecipe) => {
        setformData(newRecipe);
        setIsEditingRecipe(false);
    };

    const handleCancelAddEditRecipe = () => {
        setIsEditingRecipe(false);
    };

    const handleDeleteRecipe = () => {
        goToAddRecipe();
    };

    const [step, setStep] = useState({
        name: '',
        device: '',
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
            setformData((prevState) => ({
                ...prevState,
                steps: [...prevState.steps, newStep],
            }));
        } else {
            const updatedSteps = [...formData.steps];
            updatedSteps[stepIndex] = newStep;
            setformData((prevState) => ({
                ...prevState,
                steps: updatedSteps,
            }));
        }

        setStep({
            name: '',
            device: '',
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
            name: '',
            device: '',
            time: '',
            description: '',
            ingredients: [],
        });
    };

    const handleDeleteStep = (stepIndex) => {
        setformData((prevState) => ({
            ...prevState,
            steps: prevState.steps.filter((_, index) => index !== stepIndex),
        }));
    };

    const [isEditingIngredient, setIsEditingIngredient] = useState(false);
    const [ingredientId, setIngredientId] = useState(null);

    const [ingredient, setIngredient] = useState({
        name: '',
        quantity: '',
    });

    const handleEditIngredient = (index, idx) => {
        setIsEditingIngredient(true);
        setStepIndex(index);
        setIngredientId(idx);
        setIngredient(formData.steps[index].ingredients[idx]);
    };

    const handleAddIngredient = (index) => {
        setIsEditingIngredient(true);
        setStepIndex(index);
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
            quantity: '',
        });
        setIsEditingIngredient(false);
        setIngredientId(null);
    };

    const handleCancelAddEditIngredient = () => {
        setIsEditingIngredient(false);
        setStepIndex(null);
        setIngredientId(null);
        setIngredient({
            name: '',
            quantity: '',
        });
    };

    const handleDeleteIngredient = (stepIndex, ingredientId) => {
        setformData((prevState) => {
            const updatedSteps = [...prevState.steps];
            updatedSteps[stepIndex].ingredients = updatedSteps[
                stepIndex
            ].ingredients.filter((_, index) => index !== ingredientId);
            return {
                ...prevState,
                steps: updatedSteps,
            };
        });
    };

    return (
        <div>
            {!isEditingRecipe && (
                <Recipe
                    recipe={formData}
                    handleEditRecipe={handleEditRecipe}
                    handleDeleteRecipe={handleDeleteRecipe}
                />
            )}

            {isEditingRecipe && (
                <AddEditRecipe
                    recipe={formData}
                    handleSubmit={handleAddEditRecipe}
                    handleCancel={handleCancelAddEditRecipe}
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
                    stepIndex={stepIndex}
                    step={step}
                    handleSubmit={handleAddEditStep}
                    handleCancel={handleCancelAddEditStep}
                />
            )}

            {formData.steps.length > 0 && (
                <StepsList
                    steps={formData.steps}
                    stepIndex={stepIndex}
                    ingredient={ingredient}
                    ingredientId={ingredientId}
                    isEditingStep={isEditingStep}
                    handleEditStep={handleEditStep}
                    handleAddEditStep={handleAddEditStep}
                    handleCancelAddEditStep={handleCancelAddEditStep}
                    handleDeleteStep={handleDeleteStep}
                    isEditingIngredient={isEditingIngredient}
                    handleAddIngredient={handleAddIngredient}
                    handleAddEditIngredient={handleAddEditIngredient}
                    handleCancelAddEditIngredient={
                        handleCancelAddEditIngredient
                    }
                    handleEditIngredient={handleEditIngredient}
                    handleDeleteIngredient={handleDeleteIngredient}
                    isEditingRecipe={isEditingRecipe}
                />
            )}
        </div>
    );
};

export default AddRecipeForm;
