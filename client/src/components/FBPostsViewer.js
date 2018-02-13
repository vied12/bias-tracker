import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import gql from 'graphql-tag'
import FacebookProvider, { EmbeddedPost } from 'react-facebook'
import Slider from 'react-slick'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'
import Loader from 'components/Loader'
import Score from 'components/Score'
import { Link } from 'react-router-dom'
import { DialogContent, DialogTitle } from 'material-ui/Dialog'
import { NextButton, PrevButton } from 'components/Slider'
import { get } from 'lodash'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    '& .slick-prev::before, & .slick-next::before': {
      color: theme.palette.primary[500],
    },
    '& .slick-dots': {
      position: 'relative',
      bottom: 0,
    },
  },
  slide: {
    backgroundColor: 'white',
    minHeight: 500,
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
  adaptiveHeight: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  nextArrow: <NextButton margin={-50} />,
  prevArrow: <PrevButton margin={-50} />,
}

const FBPostsViewer = ({
  classes,
  entityData,
  tagData,
  sourceData,
  postsData,
}) => {
  if (
    sourceData.loading ||
    postsData.loading ||
    get(entityData, 'loading') ||
    get(tagData, 'loading')
  ) {
    return <Loader />
  }
  const title = (
    <div>
      <Typography>{sourceData.source.name}</Typography>
      <Typography variant="title">
        {get(tagData, 'tag.name', false) || get(entityData, 'entity.name')}
      </Typography>
    </div>
  )
  return (
    <div>
      <DialogTitle disableTypography>{title}</DialogTitle>
      <DialogContent style={{ overflowX: 'hidden' }}>
        <div className={classes.root}>
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
                        Positive sentiment:{' '}
                        <span className={classes.green}>
                          {node.sentimentreport.pos}
                        </span>
                      </Typography>
                      <Typography>
                        Neutral sentiment: {node.sentimentreport.neu}
                      </Typography>
                      <Typography>
                        Negative sentiment:{' '}
                        <span className={classes.red}>
                          {node.sentimentreport.neg}
                        </span>
                      </Typography>
                    </div>
                    <Typography variant="title" className={classes.title}>
                      Entities
                    </Typography>
                    {node.entities.edges.map(({ node: entityNode }) => (
                      <Button
                        component={Link}
                        to={`/entity/${entityNode.id}`}
                        key={entityNode.id}
                      >
                        {entityNode.name}
                      </Button>
                    ))}
                    <Typography variant="title" className={classes.title}>
                      Tags
                    </Typography>
                    {node.tags.edges.map(({ node: tagNode }) => (
                      <Button
                        component={Link}
                        to={`/tag/${tagNode.id}`}
                        key={tagNode.id}
                      >
                        {tagNode.name}
                      </Button>
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
                        <Typography variant="caption">
                          {node.message}
                        </Typography>
                        <Typography variant="caption">
                          {node.linkName}
                        </Typography>
                        <Typography variant="caption">
                          {node.linkDescription}
                        </Typography>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
            ))}
          </Slider>
        </div>
      </DialogContent>
    </div>
  )
}

export default compose(
  withStyles(styles),
  graphql(
    gql`
      query getFBPosts($entity: [ID], $tag: [ID], $source: ID!) {
        allTexts(source: $source, entities: $entity, tags: $tag) {
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
          name
        }
      }
    `,
    {
      name: 'sourceData',
    }
  ),
  graphql(
    gql`
      query getEntityFB($entity: ID!) {
        entity(id: $entity) {
          id
          name
        }
      }
    `,
    {
      name: 'entityData',
      options: props => ({
        skip: !props.entity,
      }),
    }
  ),
  graphql(
    gql`
      query getTagFB($tag: ID!) {
        tag(id: $tag) {
          id
          name
        }
      }
    `,
    {
      name: 'tagData',
      options: props => ({
        skip: !props.tag,
      }),
    }
  )
)(FBPostsViewer)
