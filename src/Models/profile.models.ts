import { DancePosition } from '../Constants/dances';

export type ProfileData = {
    username: string,
    email: string,
    active: boolean,
    uid: string,
    dances: {
        [key: string]: DancePosition
    }
}