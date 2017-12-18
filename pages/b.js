import Link from 'next/link';

import Layout from '~/components/layout';

const posts = [
  {
    title: 'Thoughts about Vue.js',
    href: '/b/2017/05/27/thoughts-about-vue-js',
    date: '2017-05-27'
  },
  {
    title: 'Request-scoped variables in Express',
    href: '/b/2016/10/29/request-persistence-express',
    date: '2016-10-29'
  },
  {
    title: 'Generating Swagger documentation for an Express API',
    href: '/b/2016/10/15/express-api-swagger',
    date: '2016-10-15'
  },
  {
    title: 'Adding JWT authentication to an Express API',
    href: '/b/2016/10/01/express-jwt',
    date: '2016-10-01'
  },
  {
    title:
      'Creating a conversational Telegram bot in Node.js with a finite state machine and async/await',
    href: '/b/2016/06/16/telegram-bot-fsm-async-await',
    date: '2016-06-16'
  },
  {
    title: 'Using JST as a source of Angular templates',
    href: '/b/2015/10/15/angular-and-jst',
    date: '2015-10-15'
  },
  {
    title: 'Unexplained syntax error on PhantomJS with strict mode',
    href: '/b/2015/07/25/syntax-error-strict-mode-phantomjs',
    date: '2015-07-25'
  },
  {
    title: 'Fixed sidebar with fixed header and footer',
    href: '/b/2014/09/03/fixed-sidebar-header-footer',
    date: '2014-09-03'
  },
  {
    title: 'Recreate ElasticSearch index for integration testing',
    href: '/b/2013/10/07/elasticsearch-recreate-index-tests',
    date: '2013-10-07'
  },
  {
    title: 'Lazy JS method evaluation',
    href: '/b/2013/02/17/lazy-js-method-evaluation',
    date: '2013-02-17'
  }
];

const PostsList = () => {
  return (
    <Layout centered>
      <ol>
        {posts.map(post => (
          <li key={post.href}>
            <time>{post.date}</time>
            <Link href={post.href}>
              <a className="post">{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>

      <style jsx>{`
        ol {
          padding-left: 0;
        }

        li {
          list-style: none;
          line-height: 1.5em;
          display: flex;
          margin: 0.7em 0;
        }

        time {
          font-size: 0.8em;
          flex: 1;
        }

        .post {
          flex: 4;
        }

        @media (max-width: 600px) {
          li {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
};

export default PostsList;
