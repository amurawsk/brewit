import React from "react";
import styles from "./Histogram.module.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colorPalette = [
	'#FFC107', '#FF5722', '#FF7043',
	'#D7B68A', '#FFCC80', '#6D4C41', '#FFB300', '#FF4500', '#F57C00',
	'#FF9E80', '#FFD54F', '#FF7043', '#FFA000', '#BF360C', '#FFD180',
	'#FFE082', '#FF6F00', '#FF9100', '#FB8C00', '#F4511E',
	'#795548', '#FFEB3B', '#FF9800',
];

const Histogram = ({ status }) => {
	const beerTypes = {};
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

	filteredOrders.forEach(order => {
		const beerType = order.beer_type;
		if (!beerTypes[beerType]) {
			beerTypes[beerType] = { volume: 0, batches: 0 };
		}

		if (status === 'TQ') {
			beerTypes[beerType].volume += order.beer_volume;
		} else if (status === 'QD') {
			beerTypes[beerType].batches += 1;
		}
	});

	if (status === 'TQ') {
		const labels = Object.keys(beerTypes);
		const datasetData = Object.values(beerTypes).map(beer => beer.volume);

		const backgroundColors = colorPalette.slice(0, labels.length);

		chartTitle = "Ilość wyprodukowanego piwa";
		chartData = {
			labels: labels,
			datasets: [
				{
					data: datasetData,
					backgroundColor: backgroundColors,
					borderColor: backgroundColors.map(color => color),
					borderWidth: 1,
				},
			],
		};
	} else if (status === 'QD') {
		const groupedByDate = {};

		filteredOrders.forEach(order => {
			const endedDate = new Date(order.ended_at);
			const dateKey = endedDate.toISOString().split('T')[0];

			if (!groupedByDate[dateKey]) {
				groupedByDate[dateKey] = 0;
			}

			groupedByDate[dateKey] += order.beer_volume;
		});
  
		const labels = Object.keys(groupedByDate);
		const datasetData = Object.values(groupedByDate);

		const backgroundColors = colorPalette.slice(0, labels.length);
  
		chartTitle = "Dzienna objętość wyprodukowanego piwa";
		chartData = {
			labels: labels,
			datasets: [
				{
					label: "Objętość piwa (litry)",
					data: datasetData,
					backgroundColor: backgroundColors,
					borderColor: backgroundColors.map(color => color),
					borderWidth: 1,
				},
			],
		};
	} else if (status === 'QM') {
		const groupedByMonth = {};

		filteredOrders.forEach(order => {
			const endedDate = new Date(order.ended_at);
			const monthKey = `${endedDate.getFullYear()}-${(endedDate.getMonth() + 1).toString().padStart(2, '0')}`;

			if (!groupedByMonth[monthKey]) {
				groupedByMonth[monthKey] = 0;
			}

			groupedByMonth[monthKey] += order.beer_volume;
		});

		const labels = Object.keys(groupedByMonth);
		const datasetData = Object.values(groupedByMonth);

		const backgroundColors = colorPalette.slice(0, labels.length);

		chartTitle = "Miesięczna objętość wyprodukowanego piwa";
		chartData = {
			labels: labels,
			datasets: [
				{
					label: "Objętość piwa (litry)",
					data: datasetData,
					backgroundColor: backgroundColors,
					borderColor: backgroundColors.map(color => color),
					borderWidth: 1,
				},
			],
		};
	} else if (status === 'QY') {
		const groupedByYear = {};

		filteredOrders.forEach(order => {
			const endedDate = new Date(order.ended_at);
			const yearKey = endedDate.getFullYear().toString();

			if (!groupedByYear[yearKey]) {
				groupedByYear[yearKey] = 0;
			}

			groupedByYear[yearKey] += order.beer_volume;
		});

		const labels = Object.keys(groupedByYear);
		const datasetData = Object.values(groupedByYear);

		const backgroundColors = colorPalette.slice(0, labels.length);

		chartTitle = "Roczna objętość wyprodukowanego piwa";
		chartData = {
			labels: labels,
			datasets: [
				{
					label: "Objętość piwa (litry)",
					data: datasetData,
					backgroundColor: backgroundColors,
					borderColor: backgroundColors.map(color => color),
					borderWidth: 1,
				},
			],
		};
	}

	return (
		<div className={styles.pieChartContainer}>
		<h2>{chartTitle}</h2>
		<Bar data={chartData} options={{
			responsive: true,
			plugins: {
			legend: { display: false },
			title: { display: false, text: chartTitle },
			},
		}} />
	</div>
	);
};
  
export default Histogram;
  