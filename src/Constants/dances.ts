const Dances: string[] = [
    'lindyHop',
    'blues',
    'fuston',
    'balboa',
    'collegiateShag',
    'salsa',
    'bachata',
    'tango',
    'kizomba',
    'balFolk'
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
