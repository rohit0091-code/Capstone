import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: "Priya Sharma",
        role: "admin",
        avatar: "https://media.rerecruitment.com/uploads/2024/04/iStock-1466985705.jpg?w=2000&h=1333&scale.option=fill&cw=2000&ch=1333&cx=center&cy=center",
        location: "Sohna, Haryana"
    });

    const switchRole = (role) => {
        setCurrentUser(prev => ({ ...prev, role }));
    };

    const isAdmin = currentUser.role === 'admin';

    return (
        <AuthContext.Provider value={{ currentUser, switchRole, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // eslint-disable-line react-refresh/only-export-components