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

const NextButton = ({
  onClick,
  style,
  className,
  currentSlide,
  slideCount,
  ...other
}) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={currentSlide + settings.slidesToShow >= slideCount}
      style={{
        position: 'absolute',
        right: -40,
        top: '50%',
      }}
    >
      <NextIcon />
    </IconButton>
  )
}

const PrevButton = ({
  onClick,
  style,
  className,
  currentSlide,
  slideCount,
}) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={currentSlide === 0}
      style={{
        position: 'absolute',
        left: -40,
        top: '50%',
      }}
    >
      <PrevIcon />
    </IconButton>
  )
}

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
