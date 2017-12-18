import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Request-scoped variables in Express"
      date="2016-10-29"
      langs={['en']}
    >
      {() => {
        return (
          <div>
            <p>
              One common requirement in web applications is keeping track of the
              currently logged in user throughout the execution of a request.
              While this is fairly simple to do in web servers where each
              request has its own execution environment (be it a thread or a
              process), Node's single-process single-thread model makes it less
              straightforward - but it can be achieved with the help of{' '}
              <a href="https://github.com/othiym23/node-continuation-local-storage">
                <code>continuation-local-storage</code>
              </a>.
            </p>

            <p>
              Say we have a secure Express application. At some point, a
              middleware is going to authenticate the user and save it somewhere
              for future use (again, I'm going to refer to my{' '}
              <a href="/2016/10/01/express-jwt">
                earlier post about using JWT with Express
              </a>{' '}
              since I had to implement this on the same app). In this case,
              after authentication is done, we'll have the user available on{' '}
              <code>req.user</code>. Good so far, but the request object is only
              available to middlewares and route handlers, and to use it further
              down the chain we'd need to pass it all the way down through
              function parameters. In some cases this might make sense, when
              conceptually each of those functions is related to the user
              executing them. But here the user was needed to make a permissions
              check on the opposite boundary of the application - before making
              a request to an external system, to make sure they had the right
              permissions to do it.
            </p>

            <p>
              So if passing the user as a parameter is not conceptually sound,
              then how do we get it all the way through to the code making the
              requests to the external service? Here is where{' '}
              <code>continuation-local-storage</code> helps. Let's see first how
              to use it and then try to understand exactly how it's doing it.
              First, we need to create a namespaces in which to store our data.
              Even though the namespace will be the same for every request,{' '}
              <strong>
                the values will be scoped for each chain of functions
              </strong>.
            </p>

            <pre>{`
const { createNamespace } = require('continuation-local-storage')

const session = createNamespace('request')

// Assuming we have our express app in \`app\`
app.use((req, res, next) => {
  session.run(() => next())
})

// And once we have authenticated the user
app.use((req, res, next) => {
  session.set('currentUser', req.user)
  next()
})
        `}</pre>

            <p>
              See that I called the namespace <code>request</code>.{' '}
              <code>continuation-local-storage</code> isn't really specific for
              a web server environment -{' '}
              <strong>
                it works for any chain of functions calling each other
              </strong>{' '}
              - so I gave it a name representing exactly what it was being used
              for in this case.
            </p>

            <p>
              Then we have to define a couple of middlewares. For{' '}
              <code>continuation-local-storage</code> to work,{' '}
              <strong>
                it needs to wrap the chain of function calls on the namespace's{' '}
                <code>#run</code> method
              </strong>. That means that that first middleware has to be defined
              as early as possible in the middleware chain.{' '}
              <strong>
                It's only inside the call stack of that method that values can
                be set or retrieved from the namespace
              </strong>.
            </p>

            <p>
              The second middleware, once the user is available somewhere (<code
              >
                req.user
              </code>{' '}
              in this case), sets it in the namespace. And that's all that's
              needed for the setup.
            </p>

            <p>
              The usage is way simpler since we'll already be inside a{' '}
              <code>#run</code> chain, so we just have to get a reference to the
              namespace and fetch the value from it:
            </p>

            <pre>{`
const { getNamespace } = require('continuation-local-storage')

function getCurrentUser() {
  return getNamespace('request').get('currentUser')
}
        `}</pre>

            <p>
              As long as <code>getCurrentUser</code> can be traced all the way
              back to the <code>#run</code> method, then everything put on the
              namespace will be available.
            </p>

            <h2>How does it work?</h2>

            <p>
              Personally I was curious on how they achieved this behavior. How
              do they keep variables across functions calling functions calling
              functions, many of those asynchronous - going to the OS and back?
            </p>

            <p>
              The answer is{' '}
              <a href="https://github.com/othiym23/async-listener">
                <code>async-listener</code>
              </a>. <code>async-listener</code> is a package which allows us to
              set callbacks for the lifecycle of asynchronous operations.{' '}
              <strong>
                So when an asynchronous operation is queued, when it fails, and
                right before or after our callbacks are called, we can add
                custom behavior
              </strong>. <code>continuation-local-storage</code> uses it to keep
              track of each execution context and make the namespace values
              available again once we're back from the asynchronous operation.
            </p>

            <p>
              Then, how does <code>async-listener</code> does it? The answer is
              simple, although the implementation is fairly complex:{' '}
              <strong>
                wrap every asynchronous function in node to be able to provide
                those callbacks
              </strong>. You can{' '}
              <a href="https://github.com/othiym23/async-listener/blob/master/index.js">
                take a look at the code to see how they did it on each case
              </a>, with some of the solutions being quite involved (see how
              they wrap promises!).
            </p>

            <h2>Links</h2>

            <ul>
              <li>
                <a href="https://github.com/othiym23/node-continuation-local-storage">
                  <code>continuation-local-storage</code>
                </a>
              </li>
              <li>
                <a href="https://github.com/othiym23/async-listener">
                  <code>async-listener</code>
                </a>
              </li>
            </ul>
          </div>
        );
      }}
    </PostLayout>
  );
};

export default Post;
