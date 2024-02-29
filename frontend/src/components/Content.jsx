import React from 'react'
import { Link } from 'react-router-dom'
const Content = () => {
  return (
    <div>
      content

      <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
          <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Content
