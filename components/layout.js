import Base from './base';
import Myself from './myself';

const Layout = ({ children }) => {
  return (
    <Base className="base-layout">
      <header>
        <Myself />
      </header>

      <div className="container">
        <div className="content">{children}</div>
      </div>

      <style jsx>{`
        header {
          border-bottom: 1px solid #242424;
        }

        .base-layout {
          display: flex;
          flex-direction: column;
        }

        .container {
          display: flex;
          justify-content: center;
        }

        .content {
          width: 45em;
        }
      `}</style>
    </Base>
  );
};

export default Layout;
