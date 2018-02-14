import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import NextIcon from 'material-ui-icons/NavigateNext'
import PrevIcon from 'material-ui-icons/NavigateBefore'
import Slider from 'react-slick'

const styles = theme => ({
  item: {
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
})

const ArrowButton = ({ onClick, margin = -40, disabled, direction, Icon }) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    style={{
      position: 'absolute',
      [direction]: margin,
      top: '50%',
      transform: 'translate(0,-50%)',
    }}
  >
    <Icon style={{ width: 50, height: 50 }} />
  </IconButton>
)

export const NextButton = ({ ...props }) => (
  <ArrowButton {...props} Icon={NextIcon} direction="right" />
)
export const PrevButton = ({ ...props }) => (
  <ArrowButton {...props} Icon={PrevIcon} direction="left" />
)

const settings = {
  infinite: false,
  speed: 500,
  lazyLoad: true,
  slidesToScroll: 1,
  adaptiveHeight: false,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  responsive: [
    { breakpoint: 10, settings: { slidesToShow: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 1100, settings: { slidesToShow: 2 } },
    { breakpoint: 10000, settings: { slidesToShow: 4 } },
  ],
}

const OwnSlider = ({ classes, children }) => {
  if (children.length === 1) {
    return (
      <div className={classes.root}>
        <div className={classes.item}>{children[0]}</div>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Slider {...settings} className={classes.slider}>
        {children.map((child, i) => (
          <div className={classes.item} key={i}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default compose(withStyles(styles))(OwnSlider)
