import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import styles from './AddTimeSlot.module.css'

const AddTimeWindowForm = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [price, setPrice] = useState('');

    const [formState, setFormState] = useState({
        device: '',
        price: '',
        dateRange: [null, null],
        timeRange: [null, null],
    });

    const handleInputChange = (e) => {
        const id = e.target.value;
        const device = equipment.find((item) => item.id === id);
        setSelectedDevice(device);
        setFormState((prevState) => ({
            ...prevState,
            device: id,
        }));
    };

    const handleDateChange = (update) => {
        setFormState((prevState) => ({
            ...prevState,
            dateRange: update,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', formState);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const getPriceLabel = () => {
        if (!selectedDevice) return 'Podaj cenę';
        const { type } = selectedDevice;
        return type === 'Kocioł do leżakowania' || type === 'Pojemnik fermentacyjny'
            ? 'Podaj cenę (za dzień)'
            : 'Podaj cenę (za godzinę)';
    };

    const handleTimeChange = (time, index) => {
        setFormState((prevState) => {
            const updatedTimeRange = [...prevState.timeRange];
            updatedTimeRange[index] = time;
            return { ...prevState, timeRange: updatedTimeRange };
        });
    };    

    const renderPicker = () => {
        if (!selectedDevice) return null;
    
        const { type } = selectedDevice;
    
        if (type === 'Kocioł do leżakowania' || type === 'Pojemnik fermentacyjny') {
            return (
                <div className={styles.addTimeSlotForm}>
                    <label className={styles.formLabel}><b>Wybierz daty dostępności</b></label>
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selectsRange
                        startDate={formState.dateRange[0]}
                        endDate={formState.dateRange[1]}
                        onChange={(update) => handleDateChange(update)}
                        isClearable
                        placeholderText="Wybierz zakres dat"
                    />
                </div>
                
            );
        } else if (type === 'Tank warzelny' || type === 'Urządzenie do rozlewania') {
            return (
                <div className={styles.addTimeSlotForm}>
                    <label className={styles.formLabel}><b>Wybierz godziny dostępności</b></label>
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selected={formState.timeRange[0]}
                        onChange={(time) => handleTimeChange(time, 0)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Początek"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę początkową"
                    />
                    <DatePicker
                        className={styles.timepickerMaxTime}
                        selected={formState.timeRange[1]}
                        onChange={(time) => handleTimeChange(time, 1)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Koniec"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę końcową"
                    />
                </div>
            );
        }
    
        return null;
    };
    

    const equipment = [
		{ id: "1", name: 'Tank warzelny #1', type: 'Tank warzelny', serial_number: '123456'},
		{ id: "2", name: 'Pojemnik fermentacyjny #1', type: 'Pojemnik fermentacyjny', serial_number: '234567'},
		{ id: "3", name: 'Kocioł do leżakowania #1', type: 'Kocioł do leżakowania', serial_number: '345678'},
		{ id: "4", name: 'Urządzenie do rozlewania #1', type: 'Urządzenie do rozlewania', serial_number: '456789'}
	];

    return (
        <div>
            <DashboardHeader />
			<div className={styles.container}>
				<CommercialSidebar />
                <div className={styles.content}>
                    <form onSubmit={handleSubmit} className={styles.addTimeSlotForm}>
                        <h1 className={styles.addTimeSlotTittle}>Dodaj okno czasowe</h1>

                        <label className={styles.formLabel}><b>Wybierz urządzenie</b></label>
                        <select className={styles.dropboxInput} value={formState.device} onChange={handleInputChange}>
                            <option value="" disabled>Wybierz urządzenie</option>
                            {equipment.map((device) => (
                                <option key={device.id} value={device.id}> {device.name + ' - ' + device.serial_number} </option>
                            ))}
                        </select>
                        
                        {selectedDevice && (
                            <div>
                            <label className={styles.formLabel}>
                                <b>{getPriceLabel()}</b>
                            </label>
                            <input
                                className={styles.addTimeSlotInput}
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                placeholder="Wpisz cenę (w zł)"
                            />
                            </div>
                        )}

                        {renderPicker()}

                        <button className={styles.insertTimeSlotButton} onClick={handleSubmit} type="submit">Dodaj okno czasowe</button>
                    </form>
                </div>
            </div>
        </div>


        
    );
};

export default AddTimeWindowForm;
