import React from 'react';
import Sound from 'react-sound';

class EasterEgg extends React.Component {
  state = {
    busted: false,
    gotExtraLife: false
  };

  bust() {
    if (!this.state.busted) {
      this.setState({ busted: true });
    }
  }

  giveExtraLife() {
    if (!this.state.gotExtraLife) {
      this.setState({ gotExtraLife: true });
    }
  }

  render() {
    const { busted, gotExtraLife } = this.state;

    return (
      <div
        className={['container', busted && 'busted'].join(' ')}
        onClick={() => this.bust()}
      >
        <img className="screen" src="/static/images/easter-egg/screen.gif" />

        <img
          className="screen-busted"
          src="/static/images/easter-egg/screen-busted.png"
        />

        <img
          className="extra-life"
          src="/static/images/easter-egg/extra-life.png"
        />

        <Sound
          url="/static/sounds/boom.mp3"
          playStatus={
            busted && !gotExtraLife
              ? Sound.status.PLAYING
              : Sound.status.STOPPED
          }
          onFinishedPlaying={() => this.giveExtraLife()}
        />

        <Sound
          url="/static/sounds/life.mp3"
          playStatus={
            gotExtraLife ? Sound.status.PLAYING : Sound.status.STOPPED
          }
        />

        <style jsx>{`
          .container {
            position: fixed;
            height: 32px;
            width: 32px;
            bottom: 0;
            right: 20px;
            cursor: pointer;
          }

          img {
            position: absolute;
            top: 0;
            left: 0;
          }

          .container.busted {
            cursor: default;
          }

          .extra-life {
            visibility: hidden;
            transition: transform 0.5s, opacity 1s 1s;
          }

          .busted .extra-life {
            visibility: visible;
            opacity: 0;
            transform: translateY(-20px);
          }
        `}</style>

        <style jsx>{`
          .screen {
            display: ${this.state.busted ? 'none' : 'block'};
          }

          .screen-busted {
            display: ${this.state.busted ? 'block' : 'none'};
          }
        `}</style>
      </div>
    );
  }
}

export default EasterEgg;
