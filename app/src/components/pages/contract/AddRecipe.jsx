import React from 'react';

import styles from './AddRecipe.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import AddRecipeForm from '../../modules/contract/AddRecipeForm.jsx';
import PageTittle from '../../utils/PageTittle.jsx';

const AddRecipe = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.addEquipment}>
                    <PageTittle text="Dodaj przepis" />
                    <AddRecipeForm isEditing={true} />
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
