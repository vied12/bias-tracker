import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import CloseIcon from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import gql from 'graphql-tag'
import FacebookProvider, { EmbeddedPost } from 'react-facebook'
import Slider from 'react-slick'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'
import Loader from 'components/Loader'
import Score from 'components/Score'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const styles = theme => ({
  root: {
    width: '80vw',
    margin: 'auto',
    '& .slick-prev::before, & .slick-next::before': {
      color: theme.palette.primary[500],
    },
    '& .slick-dots': {
      position: 'relative',
    },
  },
  close: {
    position: 'absolute',
    right: '10vw',
    zIndex: 1,
  },
  slide: {
    backgroundColor: 'white',
    minHeight: 500,
    padding: theme.spacing.unit * 6,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    '&:first-child': {
      marginTop: 0,
    },
  },
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
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
    return <Loader />
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
            <Grid container>
              <Grid item xs={12} md={3}>
                <div>
                  <Typography variant="title" className={classes.title}>
                    Scoring
                  </Typography>
                  <Typography>
                    Aggregate score:
                    <Score
                      value={node.sentimentreport.compound}
                      variant="title"
                    />
                  </Typography>
                  <Typography>
                    Strong sentiment:{' '}
                    <span className={classes.green}>
                      {node.sentimentreport.pos}
                    </span>
                  </Typography>
                  <Typography>
                    neutral sentiment: {node.sentimentreport.neu}
                  </Typography>
                  <Typography>
                    weak sentiment:{' '}
                    <span className={classes.red}>
                      {node.sentimentreport.neg}
                    </span>
                  </Typography>
                </div>
                <Typography variant="title" className={classes.title}>
                  Entities
                </Typography>
                {node.entities.edges.map(({ node: entityNode }) => (
                  <Typography key={entityNode.id}>{entityNode.name}</Typography>
                ))}
                <Typography variant="title" className={classes.title}>
                  Tags
                </Typography>
                {node.tags.edges.map(({ node: tagNode }) => (
                  <Typography key={tagNode.id}>{tagNode.name}</Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={9}>
                <FacebookProvider appId="1496795787104342">
                  <EmbeddedPost
                    href={`https://www.facebook.com/${
                      sourceData.source.facebookPageId
                    }/posts/${node.facebookId.split('_').slice(-1)}/`}
                    width="500"
                    showText
                  />
                </FacebookProvider>
                {sourceData.source.language !== 'EN' && (
                  <div>
                    <Typography>{node.message}</Typography>
                    <Typography>{node.linkName}</Typography>
                    <Typography>{node.linkDescription}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
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
              message
              linkName
              linkDescription
              sentimentreport {
                id
                neu
                pos
                neg
                compound
              }
              entities {
                edges {
                  node {
                    id
                    name
                    entityType
                  }
                }
              }
              tags {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
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
          language
        }
      }
    `,
    {
      name: 'sourceData',
    }
  )
)(FBPostsViewer)
