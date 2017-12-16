const Index = () => (
  <div className="root">
    <div className="content">
      <p className="name">Julio Olivera</p>

      <p className="links">
        <a>me</a>
        <span className="separator">|</span>
        <a>blog</a>
        <span className="separator">|</span>
        <a>things</a>
        <span className="separator">|</span>
        <a>talks</a>
        <span className="separator">|</span>
        <a href="https://github.com/julioolvr">github</a>
        <span className="separator">|</span>
        <a href="https://twitter.com/julioolvr">twitter</a>
      </p>
    </div>

    <style jsx>{`
      .root {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .content {
        text-align: center;
      }

      .name {
        text-transform: uppercase;
        margin-bottom: 0;
      }

      .links {
        margin-top: 0;
      }

      .separator {
        margin: 0 0.2em;
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
    `}</style>
  </div>
);

export default Index;
