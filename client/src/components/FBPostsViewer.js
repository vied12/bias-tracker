import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import CloseIcon from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import gql from 'graphql-tag'
import FacebookProvider, { EmbeddedPost } from 'react-facebook'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const styles = theme => ({
  root: {
    width: '80vw',
    margin: 'auto',
    '& .slick-prev::before, & .slick-next::before': {
      color: theme.palette.primary[500],
    },
  },
  close: {
    position: 'absolute',
    right: '10vw',
    zIndex: 1,
  },
  slide: {
    backgroundColor: 'white',
    textAlign: 'center',
    minHeight: 500,
    padding: theme.spacing.unit * 3,
  },
})

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
}

const FBPostsViewer = ({ classes, sourceData, postsData, onCloseRequest }) => {
  if (sourceData.loading || postsData.loading) {
    return null
  }
  return (
    <div className={classes.root}>
      <div className={classes.close}>
        <IconButton onClick={onCloseRequest}>
          <CloseIcon />
        </IconButton>
      </div>
      <Slider {...settings}>
        {postsData.allTexts.edges.map(({ node }) => (
          <div className={classes.slide} key={node.id}>
            <FacebookProvider appId="1496795787104342">
              <EmbeddedPost
                href={`https://www.facebook.com/${
                  sourceData.facebookPageId
                }/posts/${node.facebookId.split('_').slice(-1)}/`}
                width="500"
                showText
              />
            </FacebookProvider>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default compose(
  withStyles(styles),
  graphql(
    gql`
      query getFBPosts($entity: [ID], $source: ID!) {
        allTexts(source: $source, entities: $entity) {
          edges {
            node {
              id
              facebookId
            }
          }
        }
      }
    `,
    {
      name: 'postsData',
    }
  ),
  graphql(
    gql`
      query getSourceFB($source: ID!) {
        source(id: $source) {
          id
          facebookPageId
        }
      }
    `,
    {
      name: 'sourceData',
    }
  )
)(FBPostsViewer)
