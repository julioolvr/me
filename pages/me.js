import React from 'react';

import Layout from '~/components/layout';

class Me extends React.Component {
  state = {
    lang: 'en'
  };

  switchLanguage() {
    this.setState(({ lang }) => ({ lang: lang === 'en' ? 'es' : 'en' }));
  }

  render() {
    const { lang } = this.state;

    return (
      <Layout centered>
        <div className="container">
          <div>
            <h1>
              <span
                onClick={() => this.switchLanguage()}
                className={[
                  'lang-picker',
                  lang === 'en' ? 'selected' : 'unselected'
                ].join(' ')}
              >
                Hi! 👋
              </span>
              <span
                onClick={() => this.switchLanguage()}
                className={[
                  'lang-picker',
                  lang === 'es' ? 'selected' : 'unselected'
                ].join(' ')}
              >
                ¡Hola! 👋
              </span>
            </h1>

            {lang === 'en' ? (
              <p>
                My name is Julio and I'm a software developer from Argentina.
              </p>
            ) : (
              <p>
                Me llamo Julio y soy un desarrollador de software de Argentina.
              </p>
            )}

            {lang === 'en' ? (
              <p>
                I work mainly with JavaScript and Ruby, although lately I've
                been having fun with{' '}
                <a href="https://github.com/julioolvr/rlox">Rust</a> and{' '}
                <a href="https://github.com/julioolvr/flights-telegram-bot">
                  Go
                </a>.
              </p>
            ) : (
              <p>
                Trabajo principalmente con JavaScript y Ruby, aunque últimamente
                estuve jugando con{' '}
                <a href="https://github.com/julioolvr/rlox">Rust</a> y{' '}
                <a href="https://github.com/julioolvr/flights-telegram-bot">
                  Go
                </a>.
              </p>
            )}

            {lang === 'en' ? (
              <p>
                Besides coding I play the guitar,{' '}
                <a href="https://www.goodreads.com/user/show/24955009-julio">
                  I enjoy reading
                </a>{' '}
                and{' '}
                <a href="https://steamcommunity.com/id/blaquened">
                  play a *lot* of videogames
                </a>.
              </p>
            ) : (
              <p>
                Además de programar toco la guitarra,{' '}
                <a href="https://www.goodreads.com/user/show/24955009-julio">
                  disfruto un libro de vez en cuando
                </a>{' '}
                y{' '}
                <a href="https://steamcommunity.com/id/blaquened">
                  juego *mucho* a los videojuegos
                </a>.
              </p>
            )}
          </div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            height: 100%;
            align-items: center;
          }

          h1 {
            display: flex;
            justify-content: space-between;
          }

          .lang-picker {
            cursor: pointer;
          }

          .lang-picker.unselected {
            opacity: 0.3;
            transition: opacity 0.3s;
          }

          .lang-picker.unselected:hover {
            opacity: 0.5;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Me;
