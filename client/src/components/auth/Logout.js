import React from 'react'
import { NavLink } from 'reactstrap'
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
      <NavLink onClick={logingout} href="#" className="text-danger">
        Logout
      </NavLink>
    </>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
