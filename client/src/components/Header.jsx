import React, { useState } from 'react'
import { Person } from 'react-bootstrap-icons';

function Header() {
  const [open, setOpen] = useState(false)
  const Menu = ['Signup', 'Login', 'Logout']
  return (
    <div>
      <div>Sticky Notes</div>
      <div onClick={() => setOpen(!open)}><Person /></div>
      {
        open && <div>
          <ul>
            {Menu.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default Header