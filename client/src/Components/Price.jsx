import React from 'react';
import { Pricing, Wrapper, PerNight} from './styles/Price.js'

let Price = props => {

    return (
            <Wrapper>
            <Pricing>${props.pricePerNight}</Pricing><PerNight> per night</PerNight><br></br>
            ⭐️{props.averageRating} ({props.numberOfReviews} reviews)
       </Wrapper>
    )
}

export default Price;
