import React, { FunctionComponent, Fragment } from 'react'
import { DanceMap } from '../../Constants/dances';
import { getFilteredKeys } from '../../Utils/object';

type Props = {
    dances: DanceMap
}

type keys = 'follow' | 'lead';

const CustomPopup: FunctionComponent<Props> = ({ dances }: Props) => {
    // const following = Object.entries(dances).filter(item => item[1].follow).map(item => item[0]);
    const following = getFilteredKeys<DanceMap,keys>(dances, 'follow');
    const leading = getFilteredKeys<DanceMap,keys>(dances, 'lead');
    // const leading = Object.entries(dances).filter(item => { if(item[1].follow) {return item[0]} });
    console.log(following, leading);
    
    return (<Fragment>

        A pretty CSS3 popup ustom blah
        </Fragment>)

}

export default CustomPopup;