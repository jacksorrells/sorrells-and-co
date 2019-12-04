import React from 'react';
import _ from 'lodash';
import Carousel, { Modal, ModalGateway } from 'react-images';

import { Layout } from '../components/index';
import { markdownify, Link, toUrl, safePrefix, htmlToReact, getPages } from '../utils';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    let show_images = _.get(this.props, "pageContext.frontmatter.image_gallery.enabled", false), images;
    if (show_images) {
      images = _.get(this.props, "pageContext.frontmatter.image_gallery.images").map(image => {
        return { src: safePrefix(image) };
      });
    }
    this.state = {
      images: images,
      show_images: show_images,
      modalIsOpen: false
    };
  }

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }))
  }

  render() {
    console.log('community-page')
    console.log('this.props -> ', this.props);
    console.log('this.state -> ', this.state);
    return (
      <Layout {...this.props}>
        <section id="main"
          className={"wrapper" + (_.get(this.props, "pageContext.frontmatter.sidebar.enabled") ? " sidebar " + _.get(this.props, "pageContext.frontmatter.sidebar.side") : "")}
        >
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
                  <button 
                    className="button primary" 
                    onClick={toggleModal} 
                  >
                    Show Modal
                  </button>

                  <ModalGateway>
                    {modalIsOpen && (
                      <Modal onClose={this.toggleModal}>
                        <Carousel views={this.state.images} />
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
