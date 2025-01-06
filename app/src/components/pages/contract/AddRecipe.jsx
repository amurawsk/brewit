import React, { useState } from "react";
import DashboardHeader from "../../modules/DashboardHeader.jsx";
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import styles from "./Recipes.module.css";

const AddRecipe = () => {

	return (
		<div>
			<DashboardHeader />
			<div className={styles.appContainer}>
				<ContractSidebar />
				<div className={styles.content}>
				</div>
			</div>
		</div>
	);
};

export default AddRecipe;
