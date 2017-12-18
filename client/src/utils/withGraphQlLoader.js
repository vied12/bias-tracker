import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

const withGraphQlLoader = Component => props => {
  if (!props.data || props.data.loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={50} />
      </div>
    )
  } else {
    return <Component {...props} />
  }
}

export default withGraphQlLoader
