import React from 'react';
import {Link} from 'react-router-dom';

const Otherpage = ()=>
{
    console.log("I ran")
    return(
        <div>
            I am some page!
            <Link to="/">Go back home</Link>
        </div>
    )
}
export default Otherpage;