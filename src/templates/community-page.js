import React from 'react';
import _ from 'lodash';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';

import { Layout } from '../components/index';
import { markdownify, Link, toUrl, safePrefix, htmlToReact } from '../utils';

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: _.get(this.props, "pageContext.frontmatter.image_gallery.images", []).map(image => {
        return { 
          src: safePrefix(_.get(this.props, "pageContext.site.siteMetadata.cloudinaryUrl") + "/c_scale,w_auto,dpr_auto,q_auto,f_auto/" + image),
          height: 1,
          width: 1
        } 
      }),
      show_images: _.get(this.props, "pageContext.frontmatter.image_gallery.enabled", false),
      modalIsOpen: false
    };
  }

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }))
  }

  handleGalleryClick = (e) => {
    console.log('e-> ', e);
    console.log('e.target -> ', e.target)
  }

  render() {
    console.log('community-page')
    console.log('this.props -> ', this.props);
    console.log('this.state -> ', this.state);
    console.log("this.props.pageContext.site.siteMetadata.cloudinaryUrl -> ", this.props.pageContext.site.siteMetadata.cloudinaryUrl);
    return (
      <Layout {...this.props}>
        <section id="main" className="wrapper">
          <div className="inner">
            <header className="major">
              <h2>{_.get(this.props, "pageContext.frontmatter.title")}</h2>
              {markdownify(_.get(this.props, "pageContext.frontmatter.subtitle"))}
            </header>
            <div className="content">
              {_.get(this.props, "pageContext.frontmatter.content_img.enabled") && (
                <Link to={safePrefix(toUrl(this.props.pageContext.pages, _.get(this.props, "pageContext.frontmatter.content_img.url")))} className="image fit">
                  <img src={safePrefix(_.get(this.props, "pageContext.frontmatter.content_img.path"))} alt="" />
                </Link>
              )}
              {htmlToReact(_.get(this.props, "pageContext.html"))}

              {this.state.show_images && (
                <>
                  <Gallery photos={this.state.images} onClick={e => this.handleGalleryClick(e)} />

                  <button 
                    className="button primary" 
                    onClick={this.toggleModal} 
                  >
                    Show Modal
                  </button>

                  <ModalGateway>
                    {this.state.modalIsOpen && (
                      <Modal onClose={this.toggleModal} closeOnBackdropClick={true}>
                        <Carousel views={this.state.images} isFullscreen={true} />
                      </Modal>
                    )}
                  </ModalGateway>
                </>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
