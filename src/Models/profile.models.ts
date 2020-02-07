import { DancePosition } from '../Constants/dances';

export type ProfileData = {
    username: string,
    email: string,
    active: boolean,
    dances: {
        [key: string]: DancePosition
    }
}