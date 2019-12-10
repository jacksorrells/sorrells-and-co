import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { markdownify, Link, toUrl, safePrefix, htmlToReact } from '../utils';

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  }

  handleChange = e => { this.setState({ [e.target.name]: e.target.value });}


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

              <form name="contact" method="POST" netlify data-netlify="true" netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden" type="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>

                <div className="col-12">
                  <input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="col-12">
                  <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="col-12">
                  <input type="text" name="phone" id="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} />
                </div>
                <div className="col-12">
                  <textarea name="message" id="message" placeholder="Message" rows="4" value={this.state.message} onChange={this.handleChange} />
                </div>
                <div className="col-12">
                  <button type="submit" className="primary button fit">Send Message</button>
                </div>
              </form>

            </div>
          </div>
        </section>
      </Layout>
    );
  }
}