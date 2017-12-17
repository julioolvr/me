import KonamiCode from './konami';
import EasterEgg from './easterEgg';

const Base = ({ children, ...props }) => {
  return (
    <div className="root" {...props}>
      {children}
      <KonamiCode>
        <EasterEgg />
      </KonamiCode>

      <style jsx>{`
        .root {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300');

        * {
          box-sizing: border-box;
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
