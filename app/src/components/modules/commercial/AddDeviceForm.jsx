import React from 'react';
import styles from './AddDeviceForm.module.css'


const AddDeviceForm = ({device_type, setDeviceType, setName, setSerialNumber, setCapacity, setTemperatureMin, setTemperatureMax, setSourBeers, setCarbonation, setSupportedContainers, postData}) => {
    return (
        <div>
            <div className={styles.deviceTypeDropbox}>
                <label className={styles.addEquipmentLabel} htmlFor="device_type"><b>Wybierz typ urządzenia: </b></label>
                <select className={styles.dropboxInput} onChange={(e) => {console.log(e.target.value); setDeviceType(e.target.value)}}>
                    <option value="" disabled>Wybierz urządzenie</option>
                    <option value="BT">Tank Warzelny</option>
                    <option value="FT">Pojemnik fermentacyjny</option>
                    <option value="AC">Kocioł do leżakowania</option>
                    <option value="BE">Urządzenie do rozlewania</option>
                </select>
            </div>
            <form className={styles.addDeviceForm} onSubmit={(e) => { e.preventDefault(); postData(); }}>
                {device_type !== "" && (
                    <div>
                        <div>
                            <label className={styles.addEquipmentLabel} htmlFor="name"><b>Nazwa urządzenia: </b></label>
                            <input className={styles.addEquipmentInput} type="text" placeholder="Wpisz nazwę urządzenia" onChange={(e) => setName(e.target.value)} name="name" required />
                        </div>
                        <div>
                            <label className={styles.addEquipmentLabel} htmlFor="serial_number"><b>Numer seryjny: </b></label>
                            <input className={styles.addEquipmentInput} type="text" placeholder="Wpisz numer seryjny" onChange={(e) => setSerialNumber(e.target.value)} name="serial_number" required />
                        </div>
                        <div>
                            <label className={styles.addEquipmentLabel} htmlFor="capacity"><b>Pojemność: </b></label>
                            <input className={styles.addEquipmentInput} type="text" placeholder="Wpisz pojemność" onChange={(e) => setCapacity(e.target.value)} name="capacity" required />
                        </div>
                    </div> 
                    
                )}
                {device_type !== 'BE' && device_type !== "" && (
                    <div>
                        <div>
                            <label className={styles.addEquipmentLabel} htmlFor="temperature_min"><b>Temperatura minimalna: </b></label>
                            <input className={styles.addEquipmentInput} type="text" placeholder="Wpisz temperaturę minimlalną" onChange={(e) => setTemperatureMin(e.target.value)} name="temperature_min" required />
                        </div>
                        <div>
                            <label className={styles.addEquipmentLabel} htmlFor="temperature_max"><b>Temperatura maksymalna: </b></label>
                            <input className={styles.addEquipmentInput} type="text" placeholder="Wpisz temperaturę maksymalną" onChange={(e) => setTemperatureMax(e.target.value)} name="temperature_max" required />
                        </div>
                    </div>
                    
                )}
                {device_type !== "" && (
                    <div className={styles.sourBeerCheckbox}>
                        <label className={styles.addEquipmentLabel} htmlFor="sour_beers"><b>Do produkcji kwaśnych piw: </b></label>
                        <input className={styles.addEquipmentInputCheckbox} type="checkbox" onChange={(e) => setSourBeers(e.target.checked)}></input>
                    </div>
                )}
                {(device_type === 'BT' || device_type === 'BE') && (
                    <div>
                        <label className={styles.addEquipmentLabel} htmlFor="carbonation"><b>Nagazowanie: </b></label>
                        <select className={styles.dropboxInput} onChange={(e) => setCarbonation(e.target.value)}>
                            <option value="CO2">CO2</option>
                            <option value="NO2">NO2</option>
                            <option value="mieszanka CO2/NO2">Mieszanka CO2/NO2</option>
                            <option value="nie">Nie</option>
                        </select>
                    </div>
                )}
                {(device_type === 'BE') && (
                    <div>
                        <label className={styles.addEquipmentLabel} htmlFor="supported_containers"><b>Obsługiwane pojemniki: </b></label>
                        <select className={styles.dropboxInput} onChange={(e) => setSupportedContainers(e.target.value)}>
                            <option value="butelka">Butelki</option>
                            <option value="puszka">Puszki</option>
                            <option value="keg">Kegi</option>
                        </select>
                    </div>
                )}
                <button className={styles.insertDeviceButton} type="submit">Dodaj urządzenie</button>
            </form>
        </div>
    )
}

export default AddDeviceForm
