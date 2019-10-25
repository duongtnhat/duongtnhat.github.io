import React from 'react';
import ReactMarkdown from 'react-markdown'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: null}
  }

  componentDidMount () {
    let url = window.location.pathname;
    if (url === '/') url = '/index';
    fetch(url + '.md')
      .then((response) => {
        response.text().then(text => this.setState({content: text}));
        caches.open("duongtnhat-v1").then(cache => {
          cache.add(response.url);
        });
      }, (error) => {
        console.log(error);
        caches.open("duongtnhat-v1").then(cache => {
          url = (new URL(url + '.md', window.location.href)).toString();
          cache.match(url).then(response => {
            response.text().then(text => this.setState({content: text}));
          })
        });
      })
  }

  render() {
    return (
      <ReactMarkdown source={this.state.content} />
    );
  }
}
