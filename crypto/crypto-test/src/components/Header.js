import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
    <Link to='/'>LoginPage</Link>
    <Link to='/cryptopage'>CyptoPage</Link>
    </div>
  )
}

export default Header