import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [email, setEmail] = useState("");

    return (
        <AppContext.Provider value={{ email, setEmail }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };
