import React, { useEffect } from 'react'

interface AlertProps {
  type: string;
  msg: string; 
  show: boolean;
  removeAlert: () => void 
  
}


const Alert = ({type, msg, show, removeAlert} : AlertProps) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])


  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert






