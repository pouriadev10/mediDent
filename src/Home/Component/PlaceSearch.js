import React, { useEffect, useRef, useState } from "react";
import "../app.css";
import { Input } from "antd"
const AutoComplete = (props) => {
    const [userLocation, setUserLocation] = useState("");

    const autoCompleteRef = useRef();
    const inputRef = useRef();


    useEffect(() => {
        if (
            window.google &&
            window.google.maps &&
            window.google.maps.places &&
            window.google.maps.places.Autocomplete
        ) {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current
            );

            autoCompleteRef.current.addListener("place_changed", async () => {
                const place = autoCompleteRef.current.getPlace();
                if (place && place.geometry && place.geometry.location) {
                    const latitude = place.geometry.location.lat();
                    const longitude = place.geometry.location.lng();

                    const apiKey = 'AIzaSyD656YHmwQkieoKwzJopN31fZmr9Vly7w0';
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

                    try {
                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        if (data.results.length > 0) {
                            const name = data.results[0].formatted_address;
                            props.getLocation({
                                long: longitude,
                                lat: latitude,
                                name: name
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching location name:', error);

                    }
                }
            });
        }
    }, [props]);

    const handleChange = (e) => {
    }


    return (
        <React.Fragment>
            <div className="start-self-algin">
                <input
                    onChange={handleChange}
                    //className="input-search-box"
                    ref={inputRef}
                    placeholder={"Address"}
                />
            </div>
        </React.Fragment>
    );
};

export default AutoComplete;
