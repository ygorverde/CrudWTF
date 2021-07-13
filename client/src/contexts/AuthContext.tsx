import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import api from "../services/api";

type User = {
    id: string;
    name: string;
    email: string;
    type: number;
    token: string
}

type AuthContextType = {
    user: User | undefined;
    signIn: () => Promise<void>;
    validateToken: (user: User) => Promise<void>;
    validating: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType )

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [ user, setUser ] = useState<User>();
    const [ validating, setValidating ] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('wtf_user') || '{}');
        if(Object.keys(userData).length !== 0){
            validateToken(userData);
        }else{
            localStorage.removeItem('wtf_user');
        }
    }, [])

    async function signIn() {
        const resp = await api.post('/signin', { email: 'ygor@gmail.com', password: '123456' });
        
        if(resp.data){
            setValidating(true);
            const isValid = await api.post('/validateToken', resp.data);
            if(isValid){
                localStorage.setItem('wtf_user', JSON.stringify(resp.data));
                setUser(resp.data);
            }else{
                localStorage.removeItem('wtf_user');
                setUser(undefined);
            }
            setValidating(false);
        }

    }

    async function validateToken(user: User) {
        setValidating(true);
        const userData = JSON.parse(localStorage.getItem('wtf_user') || '{}');

        const isValid = await api.post('/validateToken', userData);

        if(isValid.data){
            localStorage.setItem('wtf_user', JSON.stringify(userData));
            setUser(userData)
        }else {
            localStorage.removeItem('wtf_user');
            setUser(undefined)
        }
        setValidating(false);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, validateToken, validating }}>
            {props.children}
        </AuthContext.Provider>
    )
}