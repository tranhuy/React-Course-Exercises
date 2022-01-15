import React from 'react'

const Notification = ({errorMessage}) => {
    const errorStyle = {
        color: 'red',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '10px',
        marginTop: '10px'
   }
 

    if ( !errorMessage ) {
      return null
    }

    return (
      <div style={errorStyle}>
        {errorMessage}
      </div>
    )
  }

  export default Notification