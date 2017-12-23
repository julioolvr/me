import Code from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/styles/hljs';

import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Generating Swagger documentation for an Express API"
      date="2016-10-15"
      langs={['en']}
    >
      {() => {
        return (
          <div>
            <p>
              In the process of finishing up an{' '}
              <a href="https://expressjs.com/">Express</a> project, I wanted to
              leave a nice set of documentation for future users and/or
              maintainers of the API. I wanted the documentation to live next to
              the code, and the tooling to generate a nice site from it. Finally
              I settled for <a href="http://swagger.io/">Swagger</a> and used a
              combination of packages to get the job done.
            </p>

            <p>
              There were several things I was expecting from the documentation:
            </p>

            <p>
              <ul>
                <li>
                  To live in comments next to the code, so it would be easier to
                  remember to update it when needed.
                </li>
                <li>To generate a decent enough site for navigating it.</li>
                <li>To be able to test the API through that generated site.</li>
                <li>To support making authenticated requests.</li>
                <li>Avoid owning the code for the UI.</li>
              </ul>
            </p>

            <h2>Parsing the comments</h2>

            <p>
              Let's begin by being able to extract Swagger-formatted
              documentation from comments in the code. The{' '}
              <a href="https://www.npmjs.com/package/swagger-jsdoc">
                <code>swagger-jsdoc</code>
              </a>{' '}
              project does exactly that and{' '}
              <strong>
                generates a big object containing the description of the whole
                API
              </strong>. The setup is fairly straightforward if we ignore
              Swagger specifics:
            </p>

            <Code language="js" style={vs2015}>{`
const swaggerJSDoc = require('swagger-jsdoc');

const spec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Project title',
      version: '1.0.0'
    },
    produces: ['application/json'],
    consumes: ['application/json'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [
      { jwt: [] }
    ]
  },
  apis: [
    'lib/routes/*.js'
  ]
});
  `}</Code>

            <p>
              The generator function receives an options object with two
              important properties:
            </p>
            <p>
              <ul>
                <li>
                  <code>swaggerDefinition</code> will include Swagger's global
                  options, which can be found on its{' '}
                  <a href="http://swagger.io/specification/">specification</a>{' '}
                  under "Schema".
                </li>
                <li>
                  <code>apis</code> contains an array of paths that{' '}
                  <code>swagger-jsdoc</code> will try to parse.
                </li>
              </ul>
            </p>

            <p>
              I hadn't used Swagger before starting with this documentation, so
              I'll write up about some useful properties I've been learning
              along the way with references to their specs:
            </p>
            <p>
              <ul>
                <li>
                  <code>info</code> contains metadata about the API. Its
                  contents are a Swagger{' '}
                  <a href="http://swagger.io/specification/#infoObject">
                    Info Object
                  </a>.
                </li>
                <li>
                  <code>produces</code> and <code>consumes</code> are array of
                  mime types that the API responds with and accepts,
                  respectively. They can be set for each endpoint, but since the
                  API I'm working on uses mostly JSON it was useful to set them
                  as a global default.
                </li>
                <li>
                  <code>securityDefinitions</code> specifies the way the user
                  has to authenticate to use the API.{' '}
                  <strong>The project uses JWT for authentication</strong>{' '}
                  (which I talked about in{' '}
                  <a href="/2016/10/01/express-jwt">a previous post</a>) so I
                  set it up according to Swagger's{' '}
                  <a href="http://swagger.io/specification/#securityDefinitionsObject">
                    security definition
                  </a>. It basically means that the API expects a key on the{' '}
                  <code>Authorization</code> header.
                </li>
                <li>
                  <code>security</code>, similar to <code>produces</code> and{' '}
                  <code>consumes</code>, can be set per endpoint - but since
                  most of the API requires authentication, I specify it globally
                  and override it when needed. It's an array of{' '}
                  <a href="http://swagger.io/specification/#securityRequirementObject">
                    security requirements objects
                  </a>{' '}
                  which for this kind of authentication means just listing the
                  required security definitions.
                </li>
              </ul>
            </p>

            <h2>Writing the documentation</h2>

            <p>
              With that setup, the next step is to write some documentation for
              the endpoints. <code>swagger-jsdoc</code> doesn't expect the
              comments to be placed anywhere specific, as long as they are
              somewhere in the files included by the paths defined in the{' '}
              <code>apis</code> option, so in this case{' '}
              <strong>
                I want each endpoint definition to have its documentation right
                above it
              </strong>. Let's go with a fairly comprehensive example:
            </p>

            <Code language="js" style={vs2015}>{`
/**
  * @swagger
  * /users:
  *   put:
  *     summary: Creates a new user
  *     description:
  *       "Required roles: \`admin\`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - username
  *             - password
  *           properties:
  *             username:
  *               type: string
  *             password:
  *               type: password
  *           example: {
  *             "username": "someUser",
  *             "password": "somePassword"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             username:
  *               type: string
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "username": "someuser"
  *           }
  *       409:
  *         description: When the username is already in use
  */
router.put('/', restrictToRoles('owner'), createUser);
  `}</Code>

            <p>
              Most of the structure is self-explanatory. The YAML structure{' '}
              <strong>begins with the endpoint's route</strong>, and includes{' '}
              <strong>one or several HTTP verbs</strong>. In this case since
              I'll document each verb on a separate comment, it will always have
              one verb. Then follows a short summary of the endpoint's purpose
              and an optional description. I've used the{' '}
              <code>description</code> field to document the required roles
              since Swagger only supports roles (actually scopes) properly when
              using OAuth authentication. Next we assign <code>tags</code> to
              the endpoint, which will be used to{' '}
              <strong>group related endpoints in the UI</strong>.
            </p>

            <p>
              Then things get a little bit more complex.{' '}
              <a href="http://swagger.io/specification/#parameterObject">
                Parameter objects
              </a>{' '}
              in Swagger include all parameters{' '}
              <strong>
                from query string parameters to headers, passing through form
                fields, path parameters and request bodies
              </strong>. In this case, we expect to receive the data for the new
              user on a JSON body. Even though there are several fields that our
              endpoint needs,{' '}
              <strong>
                they're all defined inside the single body parameter's schema
              </strong>.{' '}
              <a href="http://swagger.io/specification/#schemaObject">
                The schema object
              </a>{' '}
              is probably the most complicated part of the Swagger spec that I
              had to deal with yet, but the basics are simple enough.{' '}
              <strong>
                You define{' '}
                <a href="http://swagger.io/specification/#dataTypeFormat">
                  a type
                </a>{' '}
                for it
              </strong>, and if it's an object or an array{' '}
              <strong>
                you include a <code>properties</code> or <code>items</code>{' '}
                property respectively
              </strong>, describing the shape of its elements. In this case we
              expect an object with <code>username</code> and{' '}
              <code>password</code>. We could add a <code>description</code>{' '}
              field for them but they are self explanatory.
            </p>

            <p>
              <code>responses</code> lists the possible response codes for the
              endpoint, with an optional <code>schema</code> property to
              describe the response format. With everything defined, eventually
              our UI will look similar to this:
            </p>

            <p>
              <img
                src="/static/images/blog/swagger-example.png"
                alt="Swagger UI"
                title=""
              />
            </p>

            <p>
              See that red warning sign to the right? That means that{' '}
              <strong>the endpoint is secured</strong> (because we defined that
              to be the default) and clicking on it allows us to set the{' '}
              <code>Authorization</code> header to{' '}
              <strong>make authenticated requests</strong> by clicking on the
              "Try it out!" button. Let's see how to create that UI now.
            </p>

            <h2>Generating the documentation site</h2>

            <p>
              <a href="https://www.npmjs.com/package/swagger-ui-express">
                <code>swagger-ui-express</code>
              </a>{' '}
              will do just that for us. With a very simple API, given the object
              with the API definition that <code>swagger-jsdoc</code> created,
              it can be set up on a route and serve that documentation:
            </p>

            <Code language="js" style={vs2015}>{`
const swaggerUi = require('swagger-ui-express');

/**
 * Assuming we have a <code>router</code> here and the <code>spec</code>
 * generated by swagger-jsdoc...
 */

router.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
  `}</Code>

            <p>
              And as simple as that,{' '}
              <strong>
                our documentation now lives under the <code>/docs</code>{' '}
                endpoint
              </strong>. All the files for the site are owned by{' '}
              <code>swagger-ui-express</code>, so maintainers of the project
              don't have to worry about keeping it updated.
            </p>

            <p>
              I did make a little tweak to that configuration above. By default,
              the generated site will show the URL of an example JSON spec on
              its input field at the top. While it still works correctly, I set
              the route up so that it will add a query parameter to my actual
              JSON spec. For the sake of consistency, I also added an endpoint
              to serve the raw JSON spec:
            </p>

            <Code language="js" style={vs2015}>{`
/**
 * Given \`spec\` and the \`router\`
 */
const swaggerUi = require('swagger-ui-express');

const docsJsonPath = '/api-docs.json';
const swaggerUiHandler = swaggerUi.setup(spec);

router.get(docsJsonPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(spec);
});

router.use('/docs', swaggerUi.serve, (req, res, next) => {
  if (!req.query.url) {
    res.redirect(<code>/docs?url=http://\${req.headers.host}\${docsJsonPath}</code>);
  } else {
    swaggerUiHandler(req, res, next);
  }
});
  `}</Code>

            <p>
              That <code>url</code> query parameter makes the page show the
              given URL at the top instead of the default.{' '}
              <strong>And that's it!</strong> The only thing left is to document
              every endpoint in the API.
            </p>

            <h2>Alternatives</h2>

            <p>
              There are two alternatives that I considered throughout the
              process. The first is <a href="http://apidocjs.com/">apiDoc</a>,
              which generates the documentation from JSDoc-looking comments. I
              decided against it because I had a couple of issues with the
              generated site and also preferred to use something seemingly more
              standard like Swagger, but it looks like an interesting project.
            </p>

            <p>
              The other is to use{' '}
              <a href="https://github.com/apigee-127/swagger-tools">
                <code>swagger-tools</code>
              </a>, a project recommended by <code>swagger-jsdoc</code>, to
              generate the UI based on the spec. While the project works
              similarly to <code>swagger-ui-express</code>, the version of the
              Swagger UI it comes with is outdated and doesn't support
              header-based authentication. While <code>swagger-ui-express</code>'
              version is also a bit outdated, it's new enough to include it.{' '}
              <code>swagger-tools</code> does support defining a custom
              directory with a different version of Swagger UI, but that would
              mean checking out the code for the UI in version control and start
              owning it, which is something I wanted to avoid.
            </p>

            <h2>Links</h2>

            <ul>
              <li>
                <a href="http://swagger.io/specification/">
                  Swagger Specification
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/swagger-jsdoc">
                  <code>swagger-jsdoc</code>
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/swagger-ui-express">
                  <code>swagger-ui-express</code>
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
