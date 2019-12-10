import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { markdownify, Link, toUrl, safePrefix, htmlToReact } from '../utils';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  }

  render() {
    return (
      <Layout {...this.props}>
        <section id="main" className="wrapper">
          <div className="inner">
            <header className="major">
              <h2>{_.get(this.props, "pageContext.frontmatter.title")}</h2>
              {markdownify(_.get(this.props, "pageContext.frontmatter.subtitle"))}
            </header>

            {/* Freeform content */}
            <div className="content">
              {_.get(this.props, "pageContext.frontmatter.content_img.enabled") && (
                <Link to={safePrefix(toUrl(this.props.pageContext.pages, _.get(this.props, "pageContext.frontmatter.content_img.url")))} className="image fit">
                  <img src={safePrefix(_.get(this.props, "pageContext.frontmatter.content_img.path"))} alt="" />
                </Link>
              )}
              {htmlToReact(_.get(this.props, "pageContext.html"))}

              <form name="contact" method="POST" data-netlify="true" netlify netlify-honeypot="bot-field">
                <div className="col-12">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="col-12">
                  <input type="email" name="email" id="email" value="" placeholder="Email" />
                </div>
                <div className="col-12">
                  <input type="text" name="phone" id="phone" value="" placeholder="Phone" />
                </div>
                <div className="col-12">
                  <textarea name="message" id="message" placeholder="Message" rows="4" />
                </div>
                <div className="col-12">
                  <button type="Submit" className="primary button fit">Send Message</button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </Layout>
    );
  }
}