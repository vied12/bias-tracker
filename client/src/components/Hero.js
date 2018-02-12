import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import newspaperImg from 'assets/newspaper.jpg'
import { withDarkTheme } from 'theme'

const styles = theme => ({
  hero: {
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    paddingTop: '5vh',
    paddingBottom: '4vh',
    paddingLeft: '5vw',
    '& h2': {
      fontSize: '3rem',
    },
    boxShadow: '0 0 200px black inset',
  },
})
const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

const Hero = ({ classes, title, description, image }) => {
  return (
    <div
      className={classes.hero}
      style={image && { backgroundImage: `url(${image})` }}
    >
      <Typography variant="title" id={slugify(title)}>
        {title}
      </Typography>
      {description && (
        <Typography style={{ fontSize: '1rem', fontWeight: '700' }}>
          {description}
        </Typography>
      )}
    </div>
  )
}

export default compose(withDarkTheme, withStyles(styles))(Hero)
