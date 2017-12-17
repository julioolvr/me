import Layout from '../components/layout';

const Me = () => {
  return (
    <Layout>
      <div className="container">
        <div>
          <h1>Hi! 👋</h1>

          <p>My name is Julio and I'm a software developer from Argentina.</p>

          <p>
            I work mainly with JavaScript and Ruby, although lately I've been
            having fun with <a href="https://github.com/julioolvr/rlox">Rust</a>{' '}
            and{' '}
            <a href="https://github.com/julioolvr/flights-telegram-bot">Go</a>.
          </p>

          <p>
            Besides coding I play the guitar, I enjoy{' '}
            <a href="https://www.goodreads.com/user/show/24955009-julio">
              reading
            </a>{' '}
            and{' '}
            <a href="https://steamcommunity.com/id/blaquened">
              play a *lot* of videogames
            </a>.
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          height: 100%;
          align-items: center;
        }
      `}</style>
    </Layout>
  );
};

export default Me;
