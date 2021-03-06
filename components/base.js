import Head from 'next/head';

import KonamiCode from '~/components/konami';
import EasterEgg from '~/components/easterEgg';

const Base = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/static/favicon-152.png" />
      </Head>
      {children}
      <KonamiCode>
        <EasterEgg />
      </KonamiCode>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,700|Roboto:300,700');

        * {
          box-sizing: border-box;
        }

        ::selection {
          background-color: #16146c;
        }
        ::-moz-selection {
          background-color: #16146c;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #0e0e0e;
          color: #e3e3e3;
          font-family: 'Roboto Mono', monospace;
        }

        a {
          color: #af3eff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        img {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Base;
