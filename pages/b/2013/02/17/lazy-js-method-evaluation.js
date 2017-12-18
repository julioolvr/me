import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Lazy JS method evaluation"
      date="2013-02-17"
      langs={['es']}
    >
      {() => (
        <div>
          <p>
            El otro día, mirando contra mi voluntad el código de{' '}
            <a href="https://github.com/ckeditor/ckeditor-dev">CKEditor</a>, me
            encontré con un patrón para evaluación lazy de los métodos de un
            objeto JS bastante canchero (y probablemente conocido).
          </p>

          <p>
            Por ejemplo, digamos que un método de un objeto tiene una parte
            excesivamente costosa, representada convenientemente por una función
            llamada <code>doSomethingExpensive</code>.
          </p>

          <pre>{`
function doSomethingExpensive() {
  console.log('expensive!');
  return 42;
}

function doSomethingCheap(answer) {
  return answer + 1;
}

function objeto() {}

objeto.prototype.metodo = function() {
  var expensive = doSomethingExpensive();
  doSomethingCheap(expensive);
}

var obj = new objeto();
obj.metodo(); // logs 'expensive!'
obj.metodo(); // logs 'expensive!' again
`}</pre>

          <p>
            Bien, con cada llamada a <code>metodo</code> se ejecuta{' '}
            <code>doSomethingExpensive</code>. Si el resultado de esa función
            varía con cada llamada al método, no hay mucho que hacer. Pero si el
            resultado puede cachearse, o si es necesario porque el resultado
            necesita ser compartido entre sucesivas llamadas al método, entonces
            una primera forma de cambiarlo sería procesarlo cuando se declara el
            método:
          </p>

          <pre>{`
objeto.prototype.metodo = (function() {
  var expensive = doSomethingExpensive();

  return function() {
    doSomethingCheap(expensive);
  };
})();

var obj = new objeto(); // logs 'expensive!'
obj.metodo(); // no loguea nada
obj.metodo(); // no loguea nada
`}</pre>

          <p>
            La{' '}
            <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/">
              IIFE
            </a>{' '}
            se ejecuta en el momento de declarar el método, evalúa{' '}
            <code>doSomethingExpensive</code>, almacena el resultado y devuelve
            una función que usa ese valor almacenado. Esto es un avance, pero
            presenta la desventaja de que ejecuta{' '}
            <code>doSomethingExpensive</code> incluso si <code>metodo</code>{' '}
            nunca se llama. Dependiendo del caso, esto puede ser importante, ya
            sea que se vayan a inicializar muchos objetos como para retrasar el
            tiempo de inicio de la aplicación, o porque el resultado de{' '}
            <code>doSomethingExpensive</code> solamente es significativo en el
            momento en que se ejecuta <code>metodo</code>, no en el momento en
            el que se declara. En ese caso, la alternativa, que es la que vi en
            el código de CKEditor (en particular{' '}
            <a href="https://github.com/ckeditor/ckeditor-dev/blob/master/core/dom/document.js#L237">
              acá
            </a>{' '}
            al momento de escribir esto, el método <code>getWindow</code> de{' '}
            <code>document</code>), es que el método haga la evaluación, y luego
            se reemplace a sí mismo por una copia que use el valor ya calculado:
          </p>

          <pre>{`
objeto.prototype.metodo = function() {
  var expensive = doSomethingExpensive();
  this.metodo = function() {
    return doSomethingCheap(expensive);
  };
  return this.metodo();
}

var obj = new objeto(); // no loguea nada
obj.metodo(); // logs 'expensive!'
obj.metodo(); // no loguea nada
`}</pre>

          <p>
            Esto combina lo mejor de los dos mundos, no ejecuta{' '}
            <code>doSomethingExpensive</code> si <code>metodo</code> no se
            ejecuta nunca, y por otro lado si lo hace, lo hace una sola vez y
            comparte el resultado entre las sucesivas llamadas a{' '}
            <code>metodo</code>. Aprovechando que el valor de retorno de una
            asignación es el valor asignado, se puede hacer una versión más
            corta:
          </p>

          <pre>{`
objeto.prototype.metodo = function() {
  var expensive = doSomethingExpensive();
  return (this.metodo = function() {
    return doSomethingCheap(expensive);
  })();
}
`}</pre>
        </div>
      )}
    </PostLayout>
  );
};

export default Post;
