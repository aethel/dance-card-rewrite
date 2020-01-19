import React, { useState, useContext, useEffect } from 'react'
import { User as UserProfile } from '../Models/user.model';

type UserConsumer = {
    user: UserProfile
    setUser: (val: UserProfile) => void
}

const UserContext = React.createContext<Partial<UserConsumer>>({});

type Props = {
    // user: UserProfile
    children?: React.ReactNode
    // setUser: (user: UserProfile) => void
}

export const UserProvider = ({...props}:Props) => {
    const [user, setUserInState ] = useState<UserProfile>()

useEffect(() => {
    debugger
    const storageUser = JSON.parse(localStorage.getItem('user') as string);
    storageUser ? setUser(user) : setUser(UserProfile.create())
}, [])

    const getUserFromStorage = () => {

    }

    const setUser = (newUser: any) => {
        setUserInState(user => { return {user,...newUser}}) //merge rather than overwrite
    }

    return <UserContext.Provider value={{ user, setUser }} {...props} />
}

const { Consumer: UserConsumer } = UserContext

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('must use in UserProvider');
    }
    return context;
}