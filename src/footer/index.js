'use strict';
import React from 'react';
import './footer.scss';
import github from './github-white.svg';
import twitter from './twitter-white.svg';
import rss from './rss-white.svg';

class BlogFooter extends React.Component {
  render() {
    return (
      <footer className="page__footer">
        <div className="page__footer_container">
          <a href="https://github.com/OinkIguana/" className="page__footer_link"><img className="page__footer_icon" src={ github } width="32" height="32"/></a>
          <a href="https://twitter.com/OinkIguana/" className="page__footer_link"><img className="page__footer_icon" src={ twitter } width="40" height="40"/></a>
          <a href="http://blog.cameldridge.com/api/rss.rb" className="page__footer_link"><img className="page__footer_icon" src={ rss } width="32" height="32"/></a>
        </div>
        <h6 className="page__footer_copyright">&copy; 2017 Cameron Eldridge</h6>
        <svg>
          <filter id="link-color" colorInterpolationFilters="sRGB" x="0" y="0" height="100%" width="100%">
            <feColorMatrix type="matrix"
              values={`0.18 0 0 0 0
                      0.38 0 0 0 0
                      0.69 0 0 0 0
                      0    0 0 1 0`} />
          </filter>
          <filter id="link-hover" colorInterpolationFilters="sRGB" x="0" y="0" height="100%" width="100%">
            <feColorMatrix type="matrix"
              values={`0.32 0 0 0 0
                      0.56 0 0 0 0
                      0.88 0 0 0 0
                      0    0 0 1 0`} />
          </filter>
        </svg>
      </footer>
    )
  }
}

export default BlogFooter;
