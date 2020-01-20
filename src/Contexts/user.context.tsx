import React, { useState, useContext, useEffect } from 'react'
import { User as UserProfile } from '../Models/user.model';

type UserConsumer = {
    user: UserProfile
    setUser: (val: UserProfile) => void
    getUserFromStorage: () => UserProfile
}

const UserContext = React.createContext<Partial<UserConsumer>>({});

type Props = {
    // user: UserProfile
    children: React.ReactNode
    // setUser: (user: UserProfile) => void
}

export const UserProvider = ({ ...props }: Props) => {
    const [user, setUserInState] = useState<UserProfile>()

    const getUserFromStorage = () => JSON.parse(localStorage.getItem('user') as string);

    useEffect(() => {
        const storageUser = getUserFromStorage();
        storageUser ? setUser(user) : setUser(undefined)
        // storageUser ? setUser(user) : setUser(UserProfile.create())
    }, [])


    const setUser = (newUser: UserProfile | undefined): void => {
        setUserInState(newUser) //merge rather than overwrite
        // setUserInState(prevUser => { return {prevUser,...newUser}}) //merge rather than overwrite
    }

    return <UserContext.Provider value={{ user, setUser, getUserFromStorage }} {...props} />
}

const { Consumer: UserConsumer } = UserContext

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('must use in UserProvider');
    }
    return context;
}