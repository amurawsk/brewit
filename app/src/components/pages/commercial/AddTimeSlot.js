import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import DashboardHeader from '../../modules/DashboardHeader.js';
import CommercialSidebar from '../../modules/commercial/CommercialSidebar.js';
import styles from './AddTimeSlot.module.css'
import { setHours, setMinutes, isToday } from 'date-fns';
import api from '../../../api.js';

registerLocale('pl', pl);

const AddTimeWindowForm = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);

    const [formState, setFormState] = useState({
        device: '',
        price: '',
        dateRange: [null, null],
        timeRange: [null, null],
        specificDate: null,
    });

    const [devices, setDevices] = useState([]);

    const getData = async () => {
        try {
            const breweryId = 3;
            const response = await api.get(`devices/brewery/${breweryId}/`);
            if (response.status === 200) {
                setDevices(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching devices:', error);
        }
    };

	useEffect(() => {
        getData();
    }, []);

    const getMinDate = () => {
        return new Date();
    };

    const getMinTime = () => {
        if (formState.specificDate && isToday(formState.specificDate)) {
            const now = new Date();
            now.setMinutes(0, 0, 0);
            return now;
        }
        return setHours(setMinutes(formState.specificDate, 0), 0);
    };

    const getMaxTime = () => {
        const now = new Date();
        now.setHours(23, 59, 59, 0);
        return now;
    };

    const handleInputChange = (e) => {
        const id = e.target.value;
        const device = devices.find((item) => item.id.toString() === id.toString());
        setSelectedDevice(device);
        setFormState((prevState) => ({
            ...prevState,
            device: id,
            price: '',
            timeRange: [null, null],
            dateRange: [null, null],
            specificDate: null
        }));
    };

    const handleDateChange = (update) => {
        setFormState((prevState) => ({
            ...prevState,
            dateRange: update,
            timeRange: [null, null],
            specificDate: null
        }));
    };

    const handleSpecificDateChange = (date) => {
        setFormState((prevState) => ({
            ...prevState,
            specificDate: date,
            dateRange: [null, null],
            timeRange: [null, null],
        }));
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();



        console.log('Submitted data:', formState);


    };

    const handlePriceChange = (e) => {
        setFormState((prevState) => ({
            ...prevState,
            price: e.target.value
        }));
    };

    const getPriceLabel = () => {
        if (!selectedDevice) return 'Podaj cenę';
        const { device_type } = selectedDevice;
        return device_type === 'AC' || device_type === 'FT'
            ? 'Podaj cenę (za dzień)'
            : 'Podaj cenę (za godzinę)';
    };

    const handleTimeChange = (time, index) => {
        setFormState((prevState) => {
            const updatedTimeRange = [...prevState.timeRange];
            updatedTimeRange[index] = time;

            if (index === 0 && updatedTimeRange[1] && updatedTimeRange[1] <= time) {
                updatedTimeRange[1] = null;
            }

            if (prevState.specificDate) {
                const combinedDateTime = new Date(prevState.specificDate);
                combinedDateTime.setHours(time.getHours());
                combinedDateTime.setMinutes(time.getMinutes());
                updatedTimeRange[index] = combinedDateTime;
            }

            const updatedFormState = {
                ...prevState,
                timeRange: updatedTimeRange,
                dateRange: [null, null],
            };
    
            return updatedFormState;
        });
    };  

    const renderPicker = () => {
        if (!selectedDevice) return null;
    
        const { device_type } = selectedDevice;
    
        if (device_type === 'FT' || device_type === 'AC') {
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
                        locale="pl"
                        dateFormat="dd.MM.yyyy"
                        minDate={getMinDate()}
                    />
                </div>
                
            );
        } else if (device_type === 'BT' || device_type === 'BE') {
            return (
                <div className={styles.addTimeSlotForm}>
                    <label className={styles.formLabel}><b>Wybierz godziny dostępności</b></label>
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selected={formState.specificDate}
                        onChange={handleSpecificDateChange}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Wybierz dzień"
                        locale="pl"
                        minDate={getMinDate()}
                    />
                    
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selected={formState.timeRange[0]}
                        onChange={(time) => handleTimeChange(time, 0)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Początek"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę początkową"
                        locale="pl"
                        minTime={getMinTime()}
                        maxTime={getMaxTime()}
                        disabled={!formState.specificDate}
                    />
                    <DatePicker
                        className={styles.timepickerMaxTime}
                        selected={formState.timeRange[1]}
                        onChange={(time) => handleTimeChange(time, 1)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Koniec"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę końcową"
                        locale="pl"
                        minTime={formState.timeRange[0] ? new Date(formState.timeRange[0].getTime() + 60 * 60 * 1000) : getMinTime()}
                        maxTime={getMaxTime()}
                        disabled={!formState.specificDate || !formState.timeRange[0]}
                    />
                </div>
            );
        }
    
        return null;
    };
    

    // const equipment = [
	// 	{ id: "1", name: 'Tank warzelny #1', type: 'BT', serial_number: '123456'},
	// 	{ id: "2", name: 'Pojemnik fermentacyjny #1', type: 'FT', serial_number: '234567'},
	// 	{ id: "3", name: 'Kocioł do leżakowania #1', type: 'AC', serial_number: '345678'},
	// 	{ id: "4", name: 'Urządzenie do rozlewania #1', type: 'BE', serial_number: '456789'}
	// ];

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
                            {devices.map((device) => (
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
                                value={formState.price}
                                onChange={handlePriceChange}
                                placeholder="Wpisz cenę (w zł)"
                            />
                            </div>
                        )}

                        {renderPicker()}

                        <button className={styles.insertTimeSlotButton} type="submit">Dodaj okno czasowe</button>
                    </form>
                </div>
            </div>
        </div>


        
    );
};

export default AddTimeWindowForm;
