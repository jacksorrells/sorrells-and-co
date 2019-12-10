import React from 'react';
import _ from 'lodash';

import {classNames, Link, cloudinary_url} from '../utils';
import Menu from './Menu';

export default class Header extends React.Component {
  render() {

    console.log('this.props -> ', this.props);
    console.log('this.props.pageContext.site.siteMetadata -> ', this.props.pageContext.site.siteMetadata);
    console.log('this.props.pageContext.site.siteMetadata.logo -> ', this.props.pageContext.site.siteMetadata.logo);
    console.log('cloudinary_url -> ', cloudinary_url);

    let menu = _.get(this.props, 'pageContext.menus.main');
    return (
      <header id="header" className={classNames({'alt': _.get(this.props, 'pageContext.frontmatter.template') === _.get(this.props, 'pageContext.site.siteMetadata.landing_template')})}>
        <h1 id="logo">
          <Link to={_.get(this.props, 'pageContext.site.pathPrefix') || '/'}>
            <img src={_.get(this.props, 'pageContext.site.siteMetadata.logo')} alt={_.get(this.props, 'pageContext.site.siteMetadata.title')} />
          </Link>
        </h1>
        <nav id="nav">
          <Menu {...this.props} menu={menu} page={this.props.pageContext} />
        </nav>
        <Link to="#navPanel" className="navPanelToggle" />
      </header>
    );
  }
}
