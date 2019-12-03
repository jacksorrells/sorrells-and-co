import React from 'react';
import _ from 'lodash';
import Carousel, { Modal, ModalGateway } from 'react-images';

import {Layout} from '../components/index';
import {markdownify, Link, toUrl, safePrefix, htmlToReact, getPages} from '../utils';

export default class Page extends React.Component {
    render() {
        let post_list = _.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc');
        let post_len = _.size(post_list);
        console.log('page')
        console.log('this.props -> ', this.props);
        let show_images = _.get(this.props, 'pageContext.frontmatter.image_gallery.enabled');
        if (show_images) {
          let image_gallery_array = _.get(this.props, 'pageContext.frontmatter.image_gallery.images');
          console.log('image_gallery_array -> ', image_gallery_array)


          let image_gallery = image_gallery_array.map(image => {
            return { src: image };
          });

          console.log('image_gallery -> ', image_gallery)


        }
        return (
            <Layout {...this.props}>
                <section id="main" className={'wrapper' + (_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') ? ' sidebar ' + _.get(this.props, 'pageContext.frontmatter.sidebar.side') : '')}>
                    <div className="inner">
                        <header className="major">
                            <h2>{_.get(this.props, 'pageContext.frontmatter.title')}</h2>
                            {markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                        </header>

                        {/* Freeform content */}
                        <div className="content">
                            {_.get(this.props, 'pageContext.frontmatter.content_img.enabled') && 
                                <Link to={safePrefix(toUrl(this.props.pageContext.pages, _.get(this.props, 'pageContext.frontmatter.content_img.url')))} className="image fit"><img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img.path'))} alt="" /></Link>
                            }
                            {htmlToReact(_.get(this.props, 'pageContext.html'))}


                            {_.get(this.props, 'pageContext.frontmatter.image_gallery.enabled') && 
                                <Carousel views={image_gallery} />
                            }
                        </div>

                        {/* Can I remove all of this sidebar? */}
                        {_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') && 
                            <div className="sidebar">
                                {
                                _.map(_.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc'), (post, post_idx) => (<React.Fragment key={post_idx}>
                                    <section key={post_idx}>
                                        {_.get(post, 'frontmatter.alt_img') && 
                                            <Link to={safePrefix(_.get(post, 'url'))} className="image fit"><img src={safePrefix(_.get(post, 'frontmatter.alt_img'))} alt="" /></Link>
                                        }
                                        <h3>{_.get(post, 'frontmatter.title')}</h3>
                                        {markdownify(_.get(post, 'frontmatter.excerpt'))}
                                        <footer>
                                            <ul className="actions">
                                                <li><Link to={safePrefix(_.get(post, 'url'))} className="button">Learn More</Link></li>
                                            </ul>
                                        </footer>
                                    </section>
                                    {(!(post_idx === post_len - 1)) && 
                                        <hr key={post_idx} />
                                    }
                                </React.Fragment>))}
                            </div>
                        }



                    </div>
                </section>
            </Layout>
        );
    }
}
