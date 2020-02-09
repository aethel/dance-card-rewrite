import Dances, { Dance, DanceMap } from '../Constants/dances';

export type IProfile = {
    username: string | undefined,
    email: string | undefined,
    coordinates: firebase.firestore.GeoPoint | undefined,
    active: boolean | undefined,
    chats: string[] | undefined,
    uid: string | undefined,
    dances: DanceMap | undefined;
    // dances: [string, DancePosition][] | undefined;
};

export class Profile implements IProfile {
    readonly username = '';
    readonly email = '';
    readonly coordinates = undefined;
    readonly active = true;
    readonly chats = [];
    readonly uid = '';
    readonly dances = Dances;
    static create(): Profile { return new Profile() };
}