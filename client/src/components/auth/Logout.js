import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'reactstrap'
import { logout } from '../../redux/auth/auth.actions'
import PropTypes from 'prop-types'

export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func
    }

  render() {
    return (
      <>
       <NavLink onClick={this.props.logout} href="#">
           Logout
       </NavLink> 
      </>
    )
  }
}

export default connect (null, {logout}) (Logout)
