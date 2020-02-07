import React from 'react'
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'
import { DancePosition } from '../Constants/dances';

interface IUser {
    uid: number | undefined;
    name: string | undefined;
    email: string | undefined;
    displayName: string | undefined;
}
// extends GeoFirestoreTypes.Document 
// g: any;
// l: any;
// d: any; in profile

export type UserDoc = {
    username: string,
    email: string,
    coordinates: firebase.firestore.GeoPoint,
    active: boolean,
    chats: string[],
    uid: any,
    dances: {
        [key: string]: DancePosition
    }[]
};

export class User implements IUser {
    readonly uid = undefined;
    readonly name = undefined;
    readonly email = undefined;
    readonly displayName = undefined;
    static create ():User {return new User()};
}

// readonly g = undefined
// readonly l = undefined
// readonly d = undefined