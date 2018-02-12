import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown'
import CancelIcon from 'material-ui-icons/Cancel'
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp'
import ClearIcon from 'material-ui-icons/Clear'
import Chip from 'material-ui/Chip'
import Select from 'react-select'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose'
import history from 'utils/history'
import { fromGlobalId } from 'graphql-relay-tools'
import 'react-select/dist/react-select.css'

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    )
  }
}

function SelectWrapped(props) {
  const {
    classes,
    defaultTagsData,
    defaultEntitiesData,
    entitiesData,
    tagsData,
    ...other
  } = props
  let options = []
  if (
    entitiesData &&
    tagsData &&
    tagsData.allTags &&
    entitiesData.allEntities
  ) {
    options = [
      ...entitiesData.allEntities.edges.map(({ node }) => ({
        label: (
          <div>
            {node.name}{' '}
            <Typography variant="caption" component="span">
              {node.entityType}
            </Typography>
          </div>
        ),
        value: node.id,
      })),
      ...tagsData.allTags.edges.map(({ node }) => ({
        label: (
          <div>
            {node.name}{' '}
            <Typography variant="caption" component="span">
              tag
            </Typography>
          </div>
        ),
        value: node.id,
      })),
    ]
  } else {
    options = [
      ...(defaultEntitiesData.loading
        ? []
        : defaultEntitiesData.mostCommonEntities.edges.map(({ node }) => ({
            label: (
              <div>
                {node.name}{' '}
                <Typography variant="caption" component="span">
                  {node.entityType}
                </Typography>
              </div>
            ),
            value: node.id,
          }))),
      ...(defaultTagsData.loading
        ? []
        : defaultTagsData.mostCommonTags.edges.map(({ node }) => ({
            label: (
              <div>
                {node.name}{' '}
                <Typography variant="caption" component="span">
                  tag
                </Typography>
              </div>
            ),
            value: node.id,
          }))),
    ]
  }
  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps

        const onDelete = event => {
          event.preventDefault()
          event.stopPropagation()
          onRemove(value)
        }

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          )
        }

        return <div className="Select-value">{children}</div>
      }}
      {...other}
      options={options}
    />
  )
}

const SelectConnected = compose(
  graphql(
    gql`
      query searchEntities($keyword: String!) {
        allEntities(name_Icontains: $keyword, first: 5) {
          edges {
            node {
              id
              entityType
              name
            }
          }
        }
      }
    `,
    {
      name: 'entitiesData',
      options: props => ({
        variables: {
          keyword: props.inputValue,
        },
        skip: !props.inputValue || props.inputValue === '',
      }),
    }
  ),
  graphql(
    gql`
      query searchTags($keyword: String!) {
        allTags(name_Icontains: $keyword, first: 5) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    {
      name: 'tagsData',
      options: props => ({
        variables: {
          keyword: props.inputValue,
        },
        skip: !props.inputValue || props.inputValue === '',
      }),
    }
  ),
  graphql(
    gql`
      query defaultEntities {
        mostCommonEntities(first: 50) {
          edges {
            node {
              id
              name
              entityType
            }
          }
        }
      }
    `,
    {
      name: 'defaultEntitiesData',
    }
  ),
  graphql(
    gql`
      query defaultTags {
        mostCommonTags(first: 50) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    {
      name: 'defaultTagsData',
    }
  )
)(SelectWrapped)

const ITEM_HEIGHT = 48

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
})

class IntegrationReactSelect extends React.Component {
  state = {
    multi: null,
    inputValue: '',
  }

  handleChangeMulti = multi => {
    this.setState({
      multi,
    })
    this.props.onChange && this.props.onChange(multi)
    this.handleSearchChange(multi)
  }

  handleInputChange = input => {
    this.setState({ inputValue: input })
    return input
  }

  handleSearchChange = value => {
    const { type } = fromGlobalId(value.value)

    history.push(`/${type.toLowerCase()}/${value.value}`)
  }

  render() {
    const { classes } = this.props
    const { multi } = this.state
    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectConnected}
          inputProps={{
            classes,
            value: multi,
            // multi: true,
            inputValue: this.state.inputValue,
            onChange: this.handleChangeMulti,
            placeholder: 'Find a person, a company, a city…',
            instanceId: 'react-select-chip',
            id: 'react-select-chip',
            name: 'react-select-chip',
            onInputChange: this.handleInputChange,
            filterOptions: (options, filter, currentValues) => {
              // Do no filtering, just return all options
              return options
            },
          }}
        />
      </div>
    )
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(IntegrationReactSelect)
