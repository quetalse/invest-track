import {Redirect} from 'react-router-dom';

export const NotFound = () => (
    <Redirect to={{
        pathname: '/'
    }}/>
);