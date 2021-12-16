
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: '4px solid black',
    padding: 10,
  }

  return (
    <>
      {
        //display notification only when notification message is NOT EMPTY
        notification && <div style={style}>{notification}</div>
      }
    </>
  )
}

export default Notification