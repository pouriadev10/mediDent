import React, { useEffect, useRef, useState } from "react";



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
                    props.getLocation(longitude, latitude)
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        //console.log(e.target)
    }


    return (
        <React.Fragment>
            <div className="start-self-algin" style={{ width: "100%" }}>
                <input
                    autoComplete={"off"}
                    style={{ width: "100%", height: 39, borderRadius: 5 }}
                    onChange={handleChange}
                    className="ant-input-search-address"
                    ref={inputRef}
                    placeholder="Search address"
                    
                />
            </div>
        </React.Fragment>
    );
};

export default AutoComplete;
