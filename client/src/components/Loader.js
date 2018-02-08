import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

const Loader = () => (
  <div
    style={{
      textAlign: 'center',
      paddingTop: '20vh',
      paddingBottom: '20vh',
    }}
  >
    <CircularProgress />
  </div>
)

export default Loader
