import { DancePosition } from '../Constants/dances';

export type IProfile = {
    username: string | undefined,
    email: string | undefined,
    coordinates: firebase.firestore.GeoPoint | undefined,
    active: boolean | undefined,
    chats: string[] | undefined,
    uid: string | undefined,
    dances: {
        [key: string]: DancePosition
    }[] | undefined;
};

export class Profile implements IProfile {
    readonly username = undefined;
    readonly email = undefined;
    readonly coordinates = undefined;
    readonly active = true;
    readonly chats = [];
    readonly uid = undefined;
    readonly dances = [];
    static create(): Profile { return new Profile() };
}