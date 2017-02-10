import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import BlogNav from '../BlogNav'
import BlogSocial from '../BlogSocial'
import './style.scss'

class SidebarLeft extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    header = (
      <header>
        <Link
          style={{
            textDecoration: 'none',
            borderBottom: 'none',
            outline: 'none'
          }}
          to={link('/')}
        >
          <img
            src='http://785i8w.com1.z0.glb.clouddn.com/guitar_me.jpg'
            width='200'
            height='200'
          />
        </Link>

        <h1>
          <Link
            style={{
              textDecoration: 'none',
              borderBottom: 'none',
              color: 'inherit'
            }}
            to={link('/')}
          >
            {config.siteTitle}
          </Link>
        </h1>

        <p>
          {config.siteDescr}
        </p>
      </header>
    );

    return (
      <div className='sidebar' style={{
          background: 'url("http://785i8w.com1.z0.glb.clouddn.com/bg.jpg") no-repeat center',
          backgroundSize: 'cover'}}>
        <div className='sidebar-inner'>
          <div className='blog-details'>
            <header>
              {header}
            </header>
          </div>
          <div className='blog-options'>
            <BlogNav {...this.props}/>
            <footer>
            <BlogSocial {...this.props}/>
            <p className='copyright'>
              &copy; All rights reserved.
            </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

SidebarLeft.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
}

export default SidebarLeft
