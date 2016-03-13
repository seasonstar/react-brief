import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'

import './style.sss'
import '../../static/fonts/fontawesome/style.css'

class BlogSocial extends React.Component {
  render() {

    const twitter = config.linkTwitter
    const weibo = config.linkWeibo
    const rss = config.linkRss
    const email = config.linkEmail
    const github = config.linkGithub

    return (
      <div className='blog-social'>
        <ul>
          <li><a href={weibo}><i className='fa fa-weibo fa-2'></i></a></li>
          <li><a href={github}><i className='fa fa-github-alt fa-2'></i></a></li>
          <li><a href={twitter}><i className='fa fa-twitter fa-2'></i></a></li>
        </ul>
        <ul>
          <li><a href={email}><i className='fa fa-envelope-o fa-2'></i></a></li>
          <li><a href={rss}><i className='fa fa-rss fa-2'></i></a></li>
        </ul>
      </div>
    );
  }
}

export default BlogSocial
