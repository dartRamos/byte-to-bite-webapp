import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import '../styling/Nav.css'

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <p className='logo'>*Logo Here*</p>
      <div className='menu' onClick={() => {
        setMenuOpen(!menuOpen);
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
