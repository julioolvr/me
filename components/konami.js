import React from 'react';

const code = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a'
];

class KonamiCode extends React.Component {
  state = {
    last: 0,
    enabled: false
  };

  componentDidMount() {
    document.addEventListener('keydown', this.listenForCode);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listenForCode);
  }

  listenForCode = e => {
    if (code[this.state.last] === e.key.toLowerCase()) {
      this.setState(({ last }) => {
        return {
          last: last + 1,
          enabled: last + 1 >= code.length
        };
      });
    } else {
      this.setState({ last: 0 });
    }
  };

  render() {
    const { children } = this.props;
    return this.state.enabled ? children : null;
  }
}

export default KonamiCode;
