import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './EditRecipe.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import AddRecipeForm from '../../modules/contract/AddRecipeForm.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

const EditRecipe = () => {
    const location = useLocation();
    const { recipe } = location.state || {};

    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.addEquipment}>
                    <PageTittle text="Edytuj przepis" />
                    <AddRecipeForm recipe={recipe} isEditing={false} />
                </div>
            </div>
        </div>
    );
};

export default EditRecipe;
