import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Thoughts about Vue.js"
      date="2017-05-27"
      langs={['en', 'es']}
    >
      {({ lang }) => {
        return post[lang];
      }}
    </PostLayout>
  );
};

export default Post;

const post = {
  en: (
    <div>
      <p>
        I recently attended a workshop about Vue.js, organized by{' '}
        <a href="https://twitter.com/workshopsjs">@workshopsjs</a> and given by{' '}
        <a href="https://twitter.com/ianaya89">@ianaya89</a>. This post is an
        attempt to organize my thoughts regarding the framework, as basic as
        they might be by having such little exposure to it.
      </p>

      <p>
        First of all, the exercises are very good and Ignacio made a really good
        job making them simple to follow along, so I recommend to anyone wanting
        to give Vue a try (at least those of you that understand Spanish) to
        take a look at it at{' '}
        <a href="https://github.com/ianaya89/workshop-vuejs/">
          github.com/ianaya89/workshop-vuejs/
        </a>.
      </p>

      <p>
        My immediate thought after seeing some first code samples is that{' '}
        <b>the resemblance to Angular 1 is evident</b>. I've worked with
        Google's framework for a couple of years and being familiar with it
        certainly eased the learning curve, as some of the first concepts such
        as the binding and directives are similar.
      </p>

      <p>
        That being said, Vue was created in a different context - in a world
        where we are starting to see the huge benefits of component-oriented
        frontend architectures. While it's possible to develop that way in
        Angular 1, the framework doesn't naturally lead you that way (at least
        before Angular 1.5). Directives rule, and they double as components and
        as DOM manipulation tools. Angular 2 seems to have made the distinction
        between components and DOM-manipulating directives more obvious, and so
        does Vue. This seems to{' '}
        <b>lead to a better, more natural separation of the UI in components</b>,
        and that's something I consider crucial after working with Angular
        pre-1.5 for a while.
      </p>

      <p>
        <b>
          The colocation of HTML, CSS and JS for each component is also
          something I like and that is present in Vue.js' <code>.vue</code>{' '}
          files
        </b>. It seems to be possible to preprocess each part as well, and there
        are some ways to integrate JSX into it, but I haven't looked into these
        two.
      </p>

      <p>
        <b>Vue as a library is architectured in layers</b> - the core includes
        the rendering and component systems, and everything else is built on top
        of that. Much is supported officially, but it does mean that{' '}
        <b>the resulting application will only be as complex as it needs be</b>.
        Routing, state management and others can be added if necessary and left
        out if they aren't, resulting not only in a reduced size overhead but
        also on a smaller cognitive load.{' '}
        <b>You only need to learn the concepts you need</b>.
      </p>

      <p>
        There's a CLI which I used in the workshop to create the project,{' '}
        <a href="https://github.com/vuejs/vue-cli">
          <code>vue-cli</code>
        </a>, that was very useful to generate a basic setup which uses Webpack
        to transpile <code>.vue</code> files into plain JS and CSS. It seems to
        do its job well, although I haven't used it more than that so I have yet
        to see what other types of projects it generates. It <i>is</i> possible
        to generate projects according to different levels of complexity, making
        use of the layers I mentioned before. While I created the simplest one,
        there are others which already includes things like state management and
        a more opinionated directory structure.
      </p>

      <p>
        In conclusion, Vue seems to be Angular 1 done right - even though
        Angular's newest versions have improved on top of the initial release,
        the API surface is still huge and using it without TypeScript is not
        that supported (even though it should be technically possible).{' '}
        <b>
          Vue shows up as smaller, simpler alternative to Angular, improving on
          top of Angular 1 while at the same time staying conceptually lean
        </b>. This allows some immediate benefits (a flatter learning curve) and
        some not so obvious: for instance, the fact that state management is not
        baked in means that Vue can benefit from new practices in this area
        (e.g., <a href="https://github.com/vuejs/vuex">vuex</a> is a Flux-like
        state management solution for Vue). It should be possible to implement
        other patterns into Vue as long as they don't impact the core
        rendering/component systems.
      </p>

      <p>
        Even though I'm not sure if I'd switch from React to Vue, I wouldn't
        mind working with it and I'll certainly keep an eye on the library to
        see where it goes.
      </p>
    </div>
  ),
  es: (
    <div>
      <p>
        Hace poco fui a un workshop de Vue.js que dio{' '}
        <a href="https://twitter.com/ianaya89">@ianaya89</a>, organizado por la
        gente de <a href="https://twitter.com/workshopsjs">@workshopsjs</a>. En
        este post voy a tratar de recopilar lo que saqué del mismo.
      </p>

      <p>
        Antes que nada, los ejercicios del workshop están muy buenos y el repo
        que creó Ignacio está muy bien organizado y es muy simple de seguir -
        así que si alguno está interesado en probar un poco Vue, sugiero
        revisarlo en{' '}
        <a href="https://github.com/ianaya89/workshop-vuejs/">
          github.com/ianaya89/workshop-vuejs/
        </a>.
      </p>
      <p>
        Lo primero que se me vino a la cabeza después de ver un poco de código
        es que <b>se parece mucho a Angular 1</b>. Creo que haber trabajado con
        Angular un par de años me simplificó un poco entender algunos conceptos
        que maneja Vue, como su forma de hacer el binding dentro de templates y
        el uso de directivas.
      </p>
      <p>
        Ahora, si bien se nota la inspiración en Angular 1, Vue es más reciente
        y creo que eso se nota en su foco por los componentes. En los últimos
        años la comunidad se estuvo moviendo hacia arquitecturas más orientadas
        a componentes, lo que pareciera traer una serie de beneficios a la hora
        de organizarse y razonar acerca de UIs complejas. Si bien en Angular 1
        era técnicamente posible armar UIs de esta manera, el hecho de que las
        directivas hicieran las veces de componentes y de herramientas de
        manipulación del DOM hacía que no fuera <i>evidente</i> organizarse de
        esa manera. Tanto Angular 1.5+ como las nuevas versiones se esfuerzan
        por hacer esta separación entre directivas y componentes, y Vue hace
        exactamente lo mismo. Creo que esto hace más obvia la forma de organizar
        la app, lo cual hace que todos los devs del equipo puedan converger en
        una misma manera de pensar la UI.
      </p>
      <p>
        Algo a lo que me vine acostumbrando con React y me gusta es el hecho de
        <b>
          tener el código JavaScript, la vista y potencialmente los estilos de
          un componente en un mismo archivo
        </b>. Vue logra esto usando archivos
        <code>.vue</code>. Parece ser posible incluso correr cada parte
        (template, estilos) por un preprocesador, para usar por ejemplo Pug,
        SASS y JSX, aunque es algo que no llegué a probar.
      </p>
      <p>
        <b>
          La arquitectura de Vue como librería en sí está organizada en capas
        </b>. El core incluye toda la parte de rendering y el sistema de
        componentes, y el resto está construído por encima de eso. Aunque gran
        parte de ese resto tiene soporte oficial, al no estar incluído en el
        framework por default logra que{' '}
        <b>
          la librería solamente sea tan compleja como es necesario para cada
          caso
        </b>. Si necesitamos routing o manejo de estado podemos agregarlo, pero
        si necesitamos algo mucho más simple entonces el core es más que
        suficiente.{' '}
        <b>
          Ahorramos no solo en bytes, si no es la carga conceptual que tenemos
          que tener en mente a la hora de usar la librería
        </b>.
      </p>
      <p>
        Hay una CLI que el workshop te indica usar para crear el proyecto que se
        llama{' '}
        <a href="https://github.com/vuejs/vue-cli">
          <code>vue-cli</code>
        </a>. Fue útil para generar el proyecto base que usa Webpack para
        transpilar los archivos <code>.vue</code>. No la usé mucho más, pero sé
        que tiene varios «templates» que aplican a diferentes herramientas
        (Webpack vs Browserify) pero también a diferentes complejidades.
        Siguiendo lo que comentaba de las capas, se puede crear un proyecto
        simple que solo incluya el core, o uno que traiga más capas encima y con
        una estructura de directorios más armada.
      </p>
      <p>
        En conclusión, Vue parece ser un Angular 1 repensado unos años después.
        Aunque las últimas versiones de Angular cumplen con esto, siguen
        teniendo una API gigante y usarlas sin TypeScript no es lo más sencillo
        del mundo. En este sentido,{' '}
        <b>
          Vue parecería ser una alternativa más simple, mejorando Angular 1 pero
          manteniendo una API más reducida y fácil de aprender
        </b>. No solamente eso, sino que al incluir un core reducido permite que
        el camino a futuro no esté bloqueado para incluir mejores prácticas o
        ideas que surjan de otras comunidades. Por ejemplo,{' '}
        <a href="https://github.com/vuejs/vuex">vuex</a> es una librería para
        manejo de estado inspirada en Flux. Así como esa, debería ser posible
        incluir otros patrones mientras no tengan que ver con ese core de
        rendering y componentes.
      </p>
      <p>
        Aunque no sé si pasaría de React a Vue, no me molestaría trabajar con la
        librería y definitivamente voy a estar prestando atención a ver como
        evoluciona tanto como librería como comunidad.
      </p>
    </div>
  )
};
