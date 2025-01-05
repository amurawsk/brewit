import React from 'react';
import styles from './BatchOrQuantity.module.css';

const BatchOrQuantity = ({ activeStatus, setActiveStatus }) => {
	const buttons = [
	['dziennie', 'QD'],
		['miesięcznie', 'QM'],
		['rocznie', 'QY']
	];

	return (
		<div className={styles.buttonGroup}>
			{buttons.map((button) => (
				<button
					key={button[1]}
					className={`${styles.button} ${
						activeStatus === button[1] ? styles.active : ''
					}`}
					onClick={() => setActiveStatus(button[1])}>
					{button[0]}
				</button>
			))}
		</div>
	);
};

export default BatchOrQuantity;
