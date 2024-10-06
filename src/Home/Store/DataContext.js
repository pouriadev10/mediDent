import React, { createContext, useState, useEffect } from 'react';
import { Controller } from '../Controller/Controller';
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [clinics, setClinics] = useState("loading")
    const getData = async () => {
        const response = await Controller.getAllClinics()
        setClinics(response)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <DataContext.Provider value={clinics}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
