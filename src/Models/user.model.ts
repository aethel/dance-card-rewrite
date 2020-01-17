import React from 'react'
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'

interface IUser extends GeoFirestoreTypes.Document {
    uid: number | undefined;
    name: string | undefined;
    email: string | undefined;
    g: any;
    l: any;
    d: any;
}


export class User implements IUser {
    readonly uid = undefined;
    readonly name = undefined;
    readonly email = undefined;
    readonly g = undefined
    readonly l = undefined
    readonly d = undefined
    static create ():User {return new User()};
}