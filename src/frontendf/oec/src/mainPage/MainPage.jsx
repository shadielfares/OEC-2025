import React, { useState } from 'react'
import MainGlobe from './MainGlobe.jsx'

import "./mainpage.css"

function MainPage() {
    const [showMap, setShowMap] = useState(true); // State to toggle content

    const toggleContent = () => {
        setShowMap((prevState) => !prevState); // Toggle content
    };

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [disaster, setDisaster] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., log the values or send to a backend
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        console.log("Disaster:", disaster);
    };


    return (
        <div className="page">
            <div className="title">
                <h1>Welcome to AlertME</h1>
                <h3>Preventing the next disaster, by predicting it.</h3>
            </div>

            <div className="toggle-buttons">
                <button 
                    className={showMap ? 'active' : ''} 
                    onClick={toggleContent}
                    style={{borderTopLeftRadius: "2vw", borderBottomLeftRadius: "2vw"}}>
                    Predictive Map
                </button>
                <button 
                    className={!showMap ? 'active' : ''} 
                    onClick={toggleContent}
                    style={{borderTopRightRadius: "2vw", borderBottomRightRadius: "2vw"}}>
                    User Reports
                </button>
            </div>

            {(showMap) ? 
            <div className="map-div">
                <MainGlobe styleLink="mapbox://styles/shadielfares/cm6bc5z3b00ag01qr0mtr3pn5"/>
            </div> :
            <div className="user-div">
                <div className="user-map"><MainGlobe styleLink="mapbox://styles/shadielfares/cm6bf7j5w002t01qo0bj00g5c"/></div>
                <div className="Form">
                    <h2>Submit a User Report</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="latitude">Latitude:</label>
                                <input 
                                    type="number" 
                                    id="latitude" 
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="longitude">Longitude:</label>
                                <input 
                                    type="number" 
                                    id="longitude" 
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="disaster">Disaster:</label>
                                <input 
                                    type="text" 
                                    id="disaster" 
                                    value={disaster}
                                    onChange={(e) => setDisaster(e.target.value)} 
                                    required 
                                />
                            </div>

                            <button type="submit">Submit Report</button>
                        </form>
                    </div>
            </div>
            }
            
        </div>
    )
}

export default MainPage