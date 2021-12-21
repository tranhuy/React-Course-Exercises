
import React from 'react'
import { useSelector, connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)

  const style = {
    border: '4px solid black',
    padding: 10,
  }

  return (
    <>
      {
        //display notification only when notification message is NOT EMPTY
        props.notification && <div style={style}>{props.notification}</div>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification