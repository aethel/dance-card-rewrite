import React, { useState, useContext, useEffect } from 'react'
import { User as UserProfile } from '../Models/user.model';
import Firebase from '../Firebase/firebase';
import { GeoQuerySnapshot } from 'geofirestore';

type ProfileConsumer = {
    profile: UserProfile
    setProfile: (val: UserProfile) => void
    getProfileFromStorage: () => UserProfile
}

const profileStorageType = 'profile';
const userStorageType = 'user';

const ProfileContext = React.createContext<ProfileConsumer>({} as ProfileConsumer);

type Props = {
    // user: UserProfile
    children: React.ReactNode,
    firebase?: Firebase
    // setProfile: (user: UserProfile) => void
}

export const ProfileProvider = ({ ...props }: Props) => {
    const [profile, setProfileInState] = useState<UserProfile>({} as UserProfile)

    const getProfileFromStorage = () => JSON.parse(localStorage.getItem(profileStorageType) as string);
    const getUserFromStorage = () => JSON.parse(localStorage.getItem(userStorageType) as string);

    useEffect(() => {
        const storageProfile = getProfileFromStorage();
        if (storageProfile) {
            setProfile(storageProfile)
        } else {
            const localUser = getUserFromStorage();
            const profile = props.firebase?.getUsers().where('uid', '==', localUser!.uid)
            profile!.get().then((docs: GeoQuerySnapshot) => docs.forEach(doc => console.log(doc.data())))

        }
    }, [])


    const setProfile = (newProfile: UserProfile | undefined): void => {
        if (newProfile) { setProfileInState(newProfile) } //merge rather than overwrite
        // setProfileInState(prevUser => { return {prevUser,...newUser}}) //merge rather than overwrite
    }

    return <ProfileContext.Provider value={{ profile, setProfile, getProfileFromStorage }} {...props} />
}

const { Consumer: ProfileConsumer } = ProfileContext

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('must use in UserProvider');
    }
    return context;
}