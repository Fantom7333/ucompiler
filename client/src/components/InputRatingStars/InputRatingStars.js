import React, { useState } from 'react'

import classes from './InputRatingStars.module.sass'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const InputRatingStars = ({ target, setTarget }) => {
  const [countStars, setCountStars] = useState(-1)

  const result = [0, 0, 0, 0, 0]
  let rateStars = target
  for (let i = 0; rateStars >= 0; i++) {
    if (rateStars >= 1) {
      result[i] = 1
    }
    rateStars--
  }

  const changeStarsHandler = (index) => {
    setTarget(index)
  }

  const hoverOn = (selectedStarz) => {
    setCountStars(selectedStarz)
  }

  const hoverOff = () => {
    setCountStars(-1)
  }

  let stars = result.map((el, index) => (
    <div key={index}>
      {el === 1 ? (
        <div id={index} onClick={(event) => changeStarsHandler(index + 1)}>
          <StarIcon />
        </div>
      ) : (
        <div
          id={index}
          onClick={(event) => changeStarsHandler(index + 1)}
          onMouseEnter={(event) => hoverOn(index)}
        >
          {countStars >= index ? (
            <div className={classes.twoStarz}>
              <StarIcon
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  position: 'absolute',
                  right: '0',
                }}
              />
              <StarBorderIcon />
            </div>
          ) : (
            <StarBorderIcon />
          )}
        </div>
      )}
    </div>
  ))
  return (
    <div className={classes.InputRatingStars} onMouseLeave={hoverOff}>
      {stars}
    </div>
  )
}

export default InputRatingStars
