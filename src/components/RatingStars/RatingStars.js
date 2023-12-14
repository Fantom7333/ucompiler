import React from 'react'

import classes from "./RatingStars.module.sass"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const RatingStars = ({Rate}) => {
    const result = [0, 0, 0, 0, 0]

    for (let i = 0; Rate >= 0; i++){
        if (Rate >= 1) {
            result[i] = 1;
        } else if (Rate < 1 && Rate > 0) {
            result[i] = 2;
        }
        Rate--
    }

    let stars = result.map((el, index) => (
        <div key={index}>
            {el === 1 ? <StarIcon id={index}/> : el === 2 ? <StarHalfIcon id={index}/> : <StarBorderIcon id={index}/>}
        </div>
    ));
    return (
    
    <div className = { classes.RatingStars }> 
        {stars}
    </div>
    )
}


export default RatingStars