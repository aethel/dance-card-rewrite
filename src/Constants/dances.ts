const Dances: string[] = [
    'lindyhop',
    'blues',
    'fuston',
    'balboa',
    'collegiateshag',
    'salsa',
    'bachata',
    'tango',
    'kizomba',
    'balfolk'
];

export interface DancePosition {
    lead: boolean;
    follow: boolean;
}

const defaultDancePositionsState: DancePosition = {
    lead: false,
    follow: false
};


const dances = new Map<string, DancePosition>(undefined);
Dances.sort((a:string, b:string): any => a > b).forEach((dance:string) => {
    dances.set(dance, defaultDancePositionsState);
});

export default dances;
