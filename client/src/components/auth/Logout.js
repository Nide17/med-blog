import React from 'react'
import { NavLink, Button } from 'reactstrap'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { logout } from '../../redux/auth/auth.actions'

const Logout = ({logout}) => {

  const logingout = () => {
    var signOut = window.confirm("Log out?");

    if (signOut) {
      logout()
      window.location.href = "/"
    }

    else return null
  }

  return (
    <>
      <NavLink onClick={logingout} href="#"  className="m-0 p-0 px-xl-3">
        <Button color="warning" size="sm" className="py-0 px-1">
        <img src="https://img.icons8.com/color/18/000000/power-off-button.png" alt="logout"/>
        </Button>
      </NavLink>
    </>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
