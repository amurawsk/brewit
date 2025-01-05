import React from "react";
import styles from "./PieChart.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const colorPalette = [
	'#FFC107', '#FF5722', '#FF7043', '#D7B68A', '#FFCC80', '#6D4C41', 
	'#FFB300', '#FF4500', '#F57C00', '#FF9E80', '#FFD54F', '#FF7043',
	'#FFA000', '#BF360C', '#FFD180', '#FFE082', '#FF6F00', '#FF9100',
	'#FB8C00', '#F4511E', '#795548', '#FFEB3B', '#FF9800'
];

const PieChart = ({ status }) => {
	let chartData = {};
	let chartTitle = '';
	
	/*TODO mock*/
	const orders = [
	{
		id: 1,
		created_at: '2024-01-01T10:00:00.000Z',
		ended_at: '2024-01-01T10:00:00.000Z',
		beer_type: 'ABC',
		beer_volume: 120,
		status: 'C',
		contract_brewery_name: 'TwojePiwoPL',
		contract_brewery_owner_name: 'Jan Kowalski',
		contract_brewery_email: 'example@gmail.com',
		contract_brewery_phone_number: '123456789',
		rate: null,
		price: 500,
		timeslots: [
			{
				start_timestamp: '2025-01-01T08:00:00.000Z',
				end_timestamp: '2025-01-01T10:00:00.000Z',
				device_name: 'Maszyna A',
				device_serial_number: 'SN-001',
			},
			{
				start_timestamp: '2025-01-01T10:30:00.000Z',
				end_timestamp: '2025-01-01T12:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-01T10:30:00.000Z',
				end_timestamp: '2025-01-01T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-02T10:30:00.000Z',
				end_timestamp: '2025-01-02T12:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-03T10:30:00.000Z',
				end_timestamp: '2025-01-03T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-04T10:30:00.000Z',
				end_timestamp: '2025-01-04T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-04T10:30:00.000Z',
				end_timestamp: '2025-01-04T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-04T10:30:00.000Z',
				end_timestamp: '2025-01-04T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-01-04T10:30:00.000Z',
				end_timestamp: '2025-01-04T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
			{
				start_timestamp: '2025-03-04T10:00:00.000Z',
				end_timestamp: '2025-03-04T19:00:00.000Z',
				device_name: 'Maszyna B',
				device_serial_number: 'SN-002',
			},
		],
	},
	{
		id: 2,
		created_at: '2024-01-01T10:00:00.000Z',
		ended_at: '2024-01-01T10:00:00.000Z',
		beer_type: 'DEF',
		beer_volume: 120,
		status: 'P',
		contract_brewery_name: 'BeerCompany123',
		contract_brewery_owner_name: 'Jan Kowalski',
		contract_brewery_email: 'example@gmail.com',
		contract_brewery_phone_number: '123456789',
		rate: true,
		price: 500,
		timeslots: [
			{
				start_timestamp: '2024-01-02T09:00:00.000Z',
				end_timestamp: '2024-01-02T11:00:00.000Z',
				device_name: 'Maszyna X',
				device_serial_number: 'SN-003',
			},
		],
	},
	{
		id: 3,
		created_at: '2024-01-01T10:00:00.000Z',
		ended_at: '2024-01-01T10:00:00.000Z',
		beer_type: 'DEF',
		beer_volume: 120,
		status: 'P',
		contract_brewery_name: 'CosTamCosTam',
		contract_brewery_owner_name: 'Jan Kowalski',
		contract_brewery_email: 'example@gmail.com',
		contract_brewery_phone_number: '123456789',
		rate: false,
		price: 500,
		timeslots: [
			{
				start_timestamp: '2024-01-03T07:00:00.000Z',
				end_timestamp: '2024-01-03T09:30:00.000Z',
				device_name: 'Maszyna Y',
				device_serial_number: 'SN-004',
			},
		],
	},
	{
		id: 13,
		created_at: '2024-01-01T10:00:00.000Z',
		ended_at: '2024-01-01T10:00:00.000Z',
		beer_type: 'GHJ',
		beer_volume: 120,
		status: 'N',
		contract_brewery_name: 'Januszex',
		contract_brewery_owner_name: 'Jan Kowalski',
		contract_brewery_email: 'example@gmail.com',
		contract_brewery_phone_number: '123456789',
		rate: null,
		price: 500,
		timeslots: [
			{
				start_timestamp: '2026-01-04T08:00:00.000Z',
				end_timestamp: '2026-01-04T10:30:00.000Z',
				device_name: 'Maszyna Z',
				device_serial_number: 'SN-005',
			},
		],
	},
	{
		id: 16,
		created_at: '2024-01-01T09:00:00.000Z',
		ended_at: '2024-01-01T10:00:00.000Z',
		beer_type: 'ANDK',
		beer_volume: 120,
		status: 'R',
		contract_brewery_name: '2137',
		contract_brewery_owner_name: 'Jan Kowalski',
		contract_brewery_email: 'example@gmail.com',
		contract_brewery_phone_number: '123456789',
		rate: null,
		price: 500,
		timeslots: [
			{
				start_timestamp: '2024-01-05T10:00:00.000Z',
				end_timestamp: '2024-01-05T12:00:00.000Z',
				device_name: 'Maszyna W',
				device_serial_number: 'SN-006',
			},
			{
				start_timestamp: '2024-01-05T12:30:00.000Z',
				end_timestamp: '2024-01-05T14:00:00.000Z',
				device_name: 'Maszyna V',
				device_serial_number: 'SN-007',
			},
		],
	},
];

	const filteredOrders = orders.filter(order => order.status === 'P');

	if (status === 'R') {
		chartTitle = "Liczba udanych i nieudanych warek";
		const successful = filteredOrders.filter(order => order.rate === true).length;
		const unsuccessful = filteredOrders.filter(order => order.rate === false).length;

		chartData = {
			labels: ["Udane", "Nieudane"],
			datasets: [
				{
					data: [successful, unsuccessful],
					backgroundColor: ["#4caf50", "#f44336"],
				},
			],
		};
	}
	else if (status === 'TB') {
		const beerTypes = filteredOrders.reduce((acc, order) => {
			acc[order.beer_type] = (acc[order.beer_type] || 0) + 1;
			return acc;
		}, {});
  
		const labels = Object.keys(beerTypes);
		const datasetData = Object.values(beerTypes);
	
		chartTitle = "Liczba warek dla każdego typu piwa";
		chartData = {
			labels: labels,
			datasets: [
				{
					data: datasetData,
					backgroundColor: colorPalette,
				},
			],
		};
	}

	return (
	<div className={styles.pieChartContainer}>
		<h2>{chartTitle}</h2>
		<Pie data={chartData} />
		</div>
	);
};

export default PieChart;
