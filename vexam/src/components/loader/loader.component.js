import React from 'react';
import { PulseLoader,ScaleLoader } from 'react-spinners';


const Loader = (props) => (
    <div className='sweet-loading'>
        <ScaleLoader
            color={'#19C5C5'}
            loading={props.loading}
        />
    </div>
)

export default Loader;