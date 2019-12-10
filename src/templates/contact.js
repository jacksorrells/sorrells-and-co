import React, { useState } from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { markdownify, Link, toUrl, safePrefix, htmlToReact } from '../utils';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const encode = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      formData.append(k, data[k])
    });
    return formData
  }

  const handleSubmit = e => {
    const data = { "form-name": "contact", name, email, phone, message}

    fetch("/", {
      method: "POST",
      body: encode(data)
    })
      .then(() => setStatus('Form Submission Successful!!'))
      .catch(error => setStatus('Form Submission Failed!'));

    e.preventDefault();
  }

  const handleChange = e => {
    const {name, value} = e.target;
    if(name === 'name'){
      return setName(value);
    }
    if(name === 'email'){
      return setEmail(value);
    }
    if(name === 'phone'){
      return setPhone(value);
    }
    if(name === 'message'){
      return setMessage(value);
    }
  }

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

            <form name="contact" method="POST" data-netlify="true" netlify netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <div className="col-12">
                <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={handleChange} />
              </div>
              <div className="col-12">
                <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={handleChange} />
              </div>
              <div className="col-12">
                <input type="text" name="phone" id="phone" placeholder="Phone" value={phone} onChange={handleChange} />
              </div>
              <div className="col-12">
                <textarea name="message" id="message" placeholder="Message" rows="4" value={message} onChange={handleChange} />
              </div>
              <div className="col-12">
                <button type="submit" className="primary button fit">Send Message</button>
              </div>
            </form>
            <h3>{status}</h3>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;