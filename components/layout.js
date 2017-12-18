import Base from '~/components/base';
import Myself from '~/components/myself';

const Layout = ({ centered = false, children }) => {
  return (
    <Base>
      <div className="root">
        <header>
          <Myself />
        </header>

        <div className="container">
          <div className="content">{children}</div>
        </div>
      </div>

      <style jsx>{`
        .root {
          ${centered ? 'height: 100vh;' : ''};
        }
      `}</style>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
        }

        header {
          border-bottom: 1px solid #242424;
          width: 100%;
        }

        .base-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 2;
        }

        .content {
          width: 100%;
          max-height: 100%;
          padding: 0 2.5em;
        }

        @media (min-width: 45em) {
          .content {
            width: 45em;
          }
        }
      `}</style>
    </Base>
  );
};

export default Layout;
