import { createContext, useEffect, useState } from "react";

export type User = {
    name: string,
    age: number,
    isMarried: boolean
}

interface UserContextType {
    users: User[] | null;
    addUser: (user: User) => void;
    updateUser: (id: string,) => void;
    deleteUser: (id: string) => void;
}
const contextInitialValues = {
    users: null,
    addUser: () => null,
    updateUser: () => null,
    deleteUser: () => null
}
export const UserContext = createContext<UserContextType>(contextInitialValues);
type Props = {
    children: React.ReactNode
}
export const UserProvider = (props: Props) => {
    const [users, setUsers] = useState<User[] | null>(null);
    useEffect(() => {
        setUsers([{ name: "Pedro", age: 11, isMarried: false }]);
    }, [])
    const addUser = (user: User) => {

        
    };
    const updateUser = (id: string) => null;
    const deleteUser = (id: string) => null;
    return <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>{props.children}</UserContext.Provider>

}