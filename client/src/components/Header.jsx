import React, { useState } from 'react'
//use react-icons for User Icon?


function Header() {
  const [open, setOpen] = useState(false)
  const Menu = ['Signup', 'Login', 'Logout']
  return (
    <div>
      <div>Sticky Notes</div>
      <div onClick={() => setOpen(!open)}>User Icon </div>
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