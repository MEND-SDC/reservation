import React from 'react';

let Month = props => {
    return(
        <span className="label-month">
        {'   '}{props.month()}
        </span>
    )
}

export default Month;