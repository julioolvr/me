import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Using JST as a source of Angular templates"
      date="2015-10-15"
      langs={['en']}
    >
      {() => {
        return (
          <div>
            <p>
              If you're using Rails, a nice tool to expose your Javascript
              templates is{' '}
              <a href="https://github.com/sstephenson/sprockets#javascript-templating-with-ejs-and-eco">
                JST
              </a>. JST allows you to write HTML templates for your JS library
              of choice, and it exposes them in a <code>JST</code> global object
              on the client side, using their path relative to the Javascript
              asset's path as the key. They play nicely with Angular.js and
              there's a way to make Angular "JST aware" so to speak.
            </p>

            <p>
              Usually, if you're writing some piece of Angular code that uses a
              template like a directive or a route, you would be able to use
              your JST templates writing something like:
            </p>

            <pre>{`
angular.module('app')
  .directive('someDirective', function() {
    return {
      template: JST['some/template/path']()
    };
  });
  `}</pre>

            <p>
              This would execute the template function generated by JST,
              generate the HTML and set it as the directive's template. This is
              all fine, but let's look at some other ways of doing it.
            </p>

            <p>
              When we try to find a template with an URL, Angular's first step
              is to look for it on its <code>$templateCache</code>. If it can't
              find it, it will try to fetch it from the server. Knowing that, we
              can manually inject our templates in the{' '}
              <code>$templateCache</code>:
            </p>

            <pre>{`
angular.module('app')
  .directive('someDirective', function() {
    return {
      templateUrl: 'some/template/path'
    };
  })
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('some/template/path', JST['some/template/path']);
  }]);
  `}</pre>

            <p>
              In this case, we're providing the <code>$templateCache</code>{' '}
              directly with a function that will generate the template. Angular
              will find and use it when looking for that{' '}
              <code>templateUrl</code>. Now, this is all very repetitive, and we
              can avoid it by{' '}
              <a href="https://docs.angularjs.org/api/auto/service/$provide#decorator">
                decorating
              </a>{' '}
              the <code>$templateCache</code> that is used all over Angular to
              make it try and fetch from JST first.
            </p>

            <pre>{`
angular.module('app')
  .config(['$provide', function($provide) {
    $provide.decorator('$templateCache', function ($delegate) {
        var get = $delegate.get;

        $delegate.get = function (key) {
          return JST[key] || get(key);
        }

        return $delegate;
    });
  }]);
`}</pre>

            <p>
              And that's it! From then on, you can use a JST key anywhere you'd
              use a template URL and Angular will automatically take it from
              JST.
            </p>
          </div>
        );
      }}
    </PostLayout>
  );
};

export default Post;
