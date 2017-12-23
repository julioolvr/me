import Code from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/styles/hljs';

import PostLayout from '~/components/postLayout';

const Post = () => {
  return (
    <PostLayout
      title="Creating a conversational Telegram bot in Node.js with a finite state machine and async/await"
      date="2016-06-16"
      langs={['en']}
    >
      {() => (
        <div>
          <p>
            <a href="https://telegram.org/">Telegram</a>, for those who don't
            know it, is a free multi-platform messaging app. They release new
            versions with interesting features fairly often, and one of the
            biggest ones was without a doubt their{' '}
            <a href="https://core.telegram.org/bots">bot platform</a>. I've been
            having some fun lately developing a{' '}
            <a href="https://github.com/julioolvr/telegram-frinkiac-bot">
              couple
            </a>{' '}
            of{' '}
            <a href="https://github.com/julioolvr/telegram-sticker-extractor-bot">
              bots
            </a>, and I came up with a solution for a conversation-based bot
            based on a finite state machine that makes use of ECMAScript's
            upcoming{' '}
            <a href="https://tc39.github.io/ecmascript-asyncawait/">
              <code>async</code>/<code>await</code>
            </a>{' '}
            that I believe is decent and interesting enough to share. I'll
            explain it by creating a new bot from scratch.
          </p>

          <h2>Intro</h2>

          <p>
            Telegram's bot API is stateless. The only data you get regarding the
            conversation before is the id of the message the user is replying
            to, if any. Initially, this means that the bot can only respond
            easily to single commands, but can't have a more natural
            conversation to accomplish a complex task.
          </p>

          <p>
            Luckily, the API provides us with an option to force a reply from
            the user when sending a message. This means that, unless the user
            actively cancels it, every message sent can be a reply to a previous
            message of the bot. This will allow us to build a bot that can keep
            track of each conversation it has and collect data in several steps.
          </p>

          <p>
            We're going to build a simple echo bot, but with some conversational
            characteristics. When the bot receives the <code>/start</code>{' '}
            command, it will ask for the user's name. After that, it will start
            echoing mentioning the name of the user it is echoing to. Upon
            receiving a <code>/stop</code> command, it will ask for
            confirmation. If the user says <em>yes</em>, then the bot will stop
            echoing, if the user says <em>no</em>, it will go back to echoing,
            and if the user says anything else it will ask for clarification.
          </p>

          <p>
            I find Node.js fitting as a platform for building the bots - all
            operations through Telegram's API are asynchronous and most of the
            time I end up relying on yet more IO for the specific features of
            the bots. Node.js makes it easier to build bots that can respond to
            multiple conversations at a time without blocking.
          </p>

          <p>
            You can see all the code{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example">here</a>.
            You'll have to register a bot and set its key in a <code>.env</code>{' '}
            file if you want to try it. See the exact instructions in the README
            file.
          </p>

          <h2>First commit</h2>

          <p>
            The{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example/commit/91f4413d2ae33f643825a75596a19b03895549bc">
              first commit
            </a>{' '}
            has nothing really specific to the topic, so I'll just go over the
            tools and libraries we'll be using. Perhaps the only thing slightly
            related is adding <a href="https://babeljs.io">babel</a> that we'll
            eventually need for transpiling the async functions, but we'll need
            to do some more configuration for that. So, feel free to skip to the
            next section if you're not interested on what's on that basic setup.
          </p>

          <p>
            Looking at the <code>package.json</code> file, we have{' '}
            <code>eslint</code> in our dev dependencies, together with{' '}
            <code>babel-eslint</code> that will be needed for ESLint to play
            nicely with our async functions. I'm also using <code>nodemon</code>{' '}
            to automatically reload my files during development. The runtime
            dependencies include <code>babel</code> and{' '}
            <code>babel-register</code> to easily transpile our code, Babel's
            preset for ES2015 and
            <code>dotenv</code> to load the bot's token from a <code>.env</code>{' '}
            file.
          </p>

          <p>
            The <code>index.js</code> file simply uses <code>dotenv</code> to
            load the environment variables from <code>.env</code>, starts{' '}
            <code>babel-register</code> and initializes the bot (which at this
            point just logs to the console and exits).
          </p>

          <p>
            The rest are configuration files for the various tools -{' '}
            <code>.eslintrc</code> for ESLint, <code>.babelrc</code> for Babel,{' '}
            <code>.nvmrc</code> to specify Node's version with NVM and{' '}
            <code>.editorconfig</code> to keep a consistent style while writing
            the code.
          </p>

          <h2>Echoing</h2>

          <p>
            The{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example/commit/1686a61f026fbd28ee9a1a6244ad80ef8684acb9">
              next step
            </a>{' '}
            is having the bot actually doing something. Before we dive into the
            code, we'll have to actually create the bot in the platform. To do
            that, talk to{' '}
            <a href="https://web.telegram.org/#/im?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3Dbotfather">
              @BotFather
            </a>{' '}
            and follow the steps. It boils down to giving your bot a name. After
            that, you'll get a token that the bot will use to identify itself
            when querying Telegram's API. Keep that somewhere safe and let's
            start working on some basic functionality.
          </p>

          <p>
            First things first, for a while I've been coding the interaction
            with Telegram's API manually, using{' '}
            <a href="https://www.npmjs.com/package/request">
              <code>request</code>{' '}
            </a>
            or{' '}
            <a href="https://www.npmjs.com/package/got">
              <code>got</code>
            </a>{' '}
            to make the requests. There are a number of already implemented
            solutions available in NPM so this time I went with{' '}
            <a href="https://www.npmjs.com/package/node-telegram-bot-api">
              <code>node-telegram-bot-api</code>
            </a>. It has most of the API functionality implemented and it
            handles replies very well. So let's install it:
          </p>

          <Code language="bash" style={vs2015}>npm i node-telegram-bot-api --save</Code>

          <p>
            Now let's update our <code>Bot</code> class - it will use an
            instance of the class exported by <code>node-telegram-bot-api</code>{' '}
            as a client to interact with Telegram's API:
          </p>

          <Code language="js" style={vs2015}>{`
import TelegramBotClient from 'node-telegram-bot-api'

export default class Bot {
  constructor(token) {
    this.client = new TelegramBotClient(token, { polling: true })
  }

  start() {
    this.client.on('message', message => {
      console.log('Got a message', message)
    })
  }
}
  `}</Code>

          <p>
            Note that we need to pass two parameters to the client - the{' '}
            <code>token</code> is pretty simple, it's the token we got from
            @BotFather. The options object is setting up the client to poll for
            updates. Your bot has two ways to get messages from Telegram. The
            first one is using a webhook. You can configure the platform to push
            the messages to some endpoint that you own and read the messages
            from there. This is a clean solution but at the same time it implies
            more configuration. For instance, the endpoint{' '}
            <em>has</em> to be accessible through HTTPS. Self-signed
            certificates work, but it's still more troublesome to configure that
            than using polling.
          </p>

          <p>
            The polling method (<a href="https://en.wikipedia.org/wiki/Push_technology#Long_polling">
              long polling
            </a>, actually) makes a request to Telegram to fetch updates. If
            there are none, Telegram's server will just hold until there's one
            or a timeout is reached. That way, immediately after a new update
            comes through, Telegram will resolve the pending request and your
            bot will get it almost immediately.
          </p>

          <p>
            So how do we get the bot's token to the client? That's where{' '}
            <code>dotenv</code> comes in. We don't want the token to be
            hardcoded and available for everyone with access to the code. So
            we'll put the token in a <code>.env</code> file, like
          </p>

          <Code style={vs2015}>BOT_TOKEN=123456789:abcdefghijklmnoprqstuvwxyz</Code>

          <p>
            Since we're already calling <code>dotenv.load()</code> in our{' '}
            <code>index.js</code> file, we have everything that's on{' '}
            <code>.env</code> available in{' '}
            <code>process.env</code>. So we'll update <code>index.js</code> to
            pass that token to our <code>Bot</code> instance:
          </p>

          <Code language="diff" style={vs2015}>{`
-var bot = new Bot()
+var bot = new Bot(process.env.BOT_TOKEN)
          `}</Code>

          <p>
            So far so good, our bot logs each message it receives. Let's take
            one more step and make it echo whatever it receives. It's rather
            simple using <code>node-telegram-bot-api</code>, we just need to
            tell it what message we want to send (the exact text we got) and to
            which chat (the one we got it from):
          </p>

          <Code language="diff" style={vs2015}>{`
-    console.log('Got a message', message)
+    this.client.on('message', message => {
+      this.client.sendMessage(message.chat.id, message.text)
+    })
  `}</Code>

          <p>
            And that's it! At this point we have a bot that echoes whatever we
            send to it. Let's move onto having a very simple conversation
            leveraging <code>async</code>/<code>await</code>.
          </p>

          <h2>Async/Await</h2>

          <p>
            Now we want to make our bot stop echoing. When the bot receives a
            message saying <em>stop</em>, it will just say it stopped echoing.
            For that, we want to force the user to reply to each echo of the
            bot. You can see all the code in the{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example/commit/0b93835276b14a57c44c113bb12d70660e883085">
              third commit
            </a>.
          </p>

          <p>
            This could've been done without waiting for replies - just make the
            bot send the message "Stopping" if the user sent the message "stop".
            It wouldn't actually <em>stop</em> doing anything, but the end
            result would be the same. Let's do it waiting for a user reply for
            now and then we'll see an example which really needs the replies in
            the next step.
          </p>

          <p>
            We'll use the{' '}
            <a href="https://core.telegram.org/bots/api#forcereply">
              <code>ForceReply</code>
            </a>{' '}
            option in the send messages API to make Telegram automatically show
            the user the UI to reply to the bot's last message. Our code for
            sending the echo will now look like this:
          </p>

          <Code language="js" style={vs2015}>{`
this.client.sendMessage(message.chat.id,
                        \`echo: \${text}\`,
                        { reply_markup: JSON.stringify({ force_reply: true }) })
  `}</Code>

          <p>
            Note that we have to pass the options as a string, so we'll use{' '}
            <code>JSON.stringify</code> for that.
          </p>

          <p>
            <code>sendMessage</code> returns a promise that gets resolved with
            the sent message once it went through and which has some interesting
            information about it, namely its id which can be used to wait for a
            reply. <code>node-telegram-bot-api</code> has a method called
            <code>onReplyToMessage</code> which will execute a callback when a
            message comes that is a reply for a specific message id. So let's
            put those two together to handle our user's first reply:
          </p>

          <Code language="js" style={vs2015}>{`
this.client.sendMessage(message.chat.id,
                        \`echo: \${text}\`,
                        { reply_markup: JSON.stringify({ force_reply: true }) })
    .then(reply => console.log(reply))
  `}</Code>

          <p>
            Nice. So what do we actually want to do with the reply? Well, if{' '}
            <code>reply.text === 'stop'</code>, we want to stop echoing,
            otherwise we want to echo again. And wait for another reply. So
            basically the same thing we just did. Let's extract it to a method
            then:
          </p>

          <Code language="js" style={vs2015}>{`
respondTo(message) {
  if (message.text === 'stop') {
    this.client.sendMessage(message.chat.id, 'Stopping')
  } else {
    this.respondToMessage(message)
  }
}

respondToMessage(message) {
  this.client.sendMessage(message.chat.id,
                          \`echo: \${text}\`,
                          { reply_markup: JSON.stringify({ force_reply: true }) })
    .then(sentMessage => {
      this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, reply => {
        if (reply.text === 'stop') {
          this.client.sendMessage(message.chat.id, 'Stopping')
        } else {
          this.respondToMessage(reply)
        }
      })
    })
}
  `}</Code>

          <p>
            That should do the trick, right? Well, yes. But the code is (maybe
            arguably) harder to read than if it were synchronous. We have some
            nesting when the algorithm is basically a <code>while</code> loop.
            So what if the code could look more like this:
          </p>

          <Code language="js" style={vs2015}>{`
respondTo(message) {
  let text = message.text

  while (text !== 'stop') {
    let sentMessage = this.client.sendMessage(message.chat.id,
                                              \`echo: \${text}\`,
                                              { reply_markup: JSON.stringify({ force_reply: true }) })
    let reply = this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id)
    text = reply.text
  }

  this.client.sendMessage(message.chat.id, 'Stopping')
}
  `}</Code>

          <p>
            Hint: it can, and it will. That's where <code>async</code> and{' '}
            <code>await</code> come in. The{' '}
            <a href="https://tc39.github.io/ecmascript-asyncawait/">
              Async Functions proposal
            </a>{' '}
            aims to make it simpler to write asynchronous code like the above.
            It leverages the power of{' '}
            <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*">
              generators
            </a>{' '}
            and{' '}
            <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise">
              promises
            </a>{' '}
            - and can actually be considered{' '}
            <a href="https://tc39.github.io/ecmascript-asyncawait/#desugaring">
              syntax sugar over both
            </a>{' '}
            - to make writing code that interacts with promises very
            straightforward.
          </p>

          <p>
            The first keyword, <code>async</code>, is used in function
            declarations to make it clear that they are asynchronous. In
            practice, this means that they'll return promises. In our case, we
            just need to declare <code>respondTo</code> as{' '}
            <code>async respondTo</code>.
          </p>

          <p>
            <code>await</code> can only be used in <code>async</code> functions.
            It will take the promise following it and stop execution until it
            resolves. Putting the two of them together means that, roughly, the
            following two snippets are equivalent:
          </p>

          <Code language="js" style={vs2015}>{`
function syncFunction() {
  return someAsyncOperation()
    .then(result => result + 1)
    .catch(err => console.error(err))
}

async function asyncFunction() {
  try {
    let result = await someAsyncOperation()
    return result + 1
  } catch (err) {
    console.error(err)
  }
}
  `}</Code>

          <p>
            Going back to our code, the first step we need to take is to
            configure Babel to support async functions. Since they're not part
            of the spec yet, they aren't supported by default. So first, we want
            to install <code>babel-plugin-transform-async-to-generator</code>{' '}
            along with <code>babel-polyfill</code>:
          </p>

          <Code language="bash" style={vs2015}>
            npm i babel-plugin-transform-async-to-generator babel-polyfill
            --save
          </Code>

          <p>
            Once that's done, we need to add{' '}
            <code>require('babel-polyfill')</code> before requiring{' '}
            <code>babel-register</code> in our <code>index.js</code> file, and
            configure Babel to use the async transformation plugin in our{' '}
            <code>.babelrc</code> file:
          </p>

          <Code language="json" style={vs2015}>{`
{
  "presets": [
    "es2015"
  ],
  "plugins": [
    "transform-async-to-generator"
  ]
}
  `}</Code>

          <p>
            Now we can go and use async functions in the bot's code. We can use{' '}
            <code>await</code> directly with{' '}
            <code>this.client.sendMessage</code> since, as we saw before, it
            returns a promise. <code>this.client.onReplyToMessage</code> is a
            little bit trickier - it doesn't return a promise, instead it
            executes a callback that it receives as the last parameter when the
            reply arrives. We'll have to turn it into a promise, but luckily
            that's not hard at all:
          </p>

          <Code language="js" style={vs2015}>{`
let reply = await new Promise(resolve =>
  this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, resolve)
)
  `}</Code>

          <p>
            I won't go into the details of promise creation since there are good
            posts out there, but the gist of it is that we're creating a new
            promise that gets resolved when{' '}
            <code>this.client.onReplyToMessage</code> executes its callback, and
            the value it resolves to is the parameter that's passed to that
            callback. So if we put everything together, we end up with something
            like this:
          </p>

          <Code language="js" style={vs2015}>{`
async respondTo(message) {
  let text = text = message.text

  while (text !== 'stop') {
    let sentMessage = await this.client.sendMessage(message.chat.id,
                                                    \`echo: \${text}\`,
                                                    { reply_markup: JSON.stringify({ force_reply: true }) })
    let reply = await new Promise(resolve => this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, resolve))
    text = reply.text
  }

  this.client.sendMessage(message.chat.id, 'Stopping')
}
  `}</Code>

          <p>
            Note that we marked <code>respondTo</code> as <code>async</code>,
            and then used two <code>await</code>s in the body of the{' '}
            <code>while</code> loop. And that's it! The code certainly reads a
            lot easier, almost as if it were synchronous. It could be better if
            we didn't have to "promisify" the call to{' '}
            <code>this.client.onReplyToMessage</code> but it's definitely easier
            to follow than the version without <code>async</code>/<code>
              await
            </code>.
          </p>

          <p>
            One more change we'll have to do for this to work - while the user
            replies will get to the callback in{' '}
            <code>this.client.onReplyToMessage</code>, they are also regular
            messages so they will show up in our callback to{' '}
            <code>this.client.on('message')</code> as well. So we have to update
            that callback to only take into account messages which are not
            replies. Replies will already be caught by the loop.
          </p>

          <Code language="js" style={vs2015}>{`
start() {
  this.client.on('message', message => {
    if (!message.reply_to_message) {
      this.respondTo(message)
    }
  })
}
  `}</Code>

          <p>
            Having done this, it's time to model more complex behavior in the
            form of a state machine.
          </p>

          <h2>Finite State Machine</h2>

          <p>
            Let's remember the final functionality we expect from the bot. It
            should ask us for our name upon <code>/start</code>. Then, it should
            start echoing whatever we send to it, until we say{' '}
            <code>/stop</code>. When we send that command, it should ask us for
            confirmation. If we say "yes", the execution should finish. If we
            say "no", it should go back to echoing. If we say anything else, it
            should ask for clarification.
          </p>

          <p>
            There might be several ways to model this behavior. What I know for
            sure is that I want to avoid having a bunch of flags and complicated
            conditionals that are checked on each reply, because the pain it
            would be to write it wouldn't be comparable to the pain of
            maintaining it. So one possible way to create a mental model of it
            is to think of the bot being in one of several states, and being
            able to transition between them:
          </p>

          <p>
            <img
              src="/static/images/blog/telegram-fsm.png"
              alt="Bot states"
              title=""
            />
          </p>

          <p>
            It's been a while since I studied finite state machines so I'm not
            going to pretend I remember them well enough to explain it here.
            I'll refer to the always trustworthy{' '}
            <a href="https://en.wikipedia.org/wiki/Finite-state_machine">
              Wikipedia article
            </a>{' '}
            for them, but if you want a quick explanation that's enough for the
            purposes of this post, here it goes.
          </p>

          <p>
            A finite state machine (FSM from now on) is a model that is composed
            of states, and the transitions between them. The machine is always
            in one of those states, until an event comes that makes it change to
            another. Some of those states can be considered final or terminal.
          </p>

          <p>
            Not surprisingly, that model fits the diagram of the bot above
            pretty well. The bot will be in one of several states, which mostly
            represent what is it waiting for - the <code>/start</code> command,
            a name, text to echo and so on. It will be our job to determine,
            based on the current state of the machine and the message we get
            from Telegram's API, what's the corresponding event.
          </p>

          <p>
            Again, you can check the{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example/commit/ffb568314ad5f8f531828246495f0cc1852e0e2c">
              corresponding commit
            </a>{' '}
            to see the changes.
          </p>

          <h3>Defining the state machine</h3>

          <p>
            Let's start by installing a library that will handle the FSM
            internals. I'll go with{' '}
            <a href="https://www.npmjs.com/package/javascript-state-machine">
              <code>javascript-state-machine</code>
            </a>{' '}
            but it's likely there are plenty of others.
          </p>

          <Code language="bash" style={vs2015}>npm i javascript-state-machine --save</Code>

          <p>
            Now let's write the FSM from above using the library. Since an
            instance of the FSM keeps track of its current state, we want to
            have one instance per conversation. So we'll start by defining a
            function that creates the machine:
          </p>

          <Code language="js" style={vs2015}>{`
import StateMachine from 'javascript-state-machine'

function createFsm() {
  return StateMachine.create({
    initial: 'waitingstart',
    final: 'final',
    events: [
      { name: 'gotstart', from: 'waitingstart', to: 'waitingname' },
      { name: 'gotname', from: 'waitingname', to: 'echoing' },
      { name: 'gottext', from: 'echoing', to: 'echoing' },
      { name: 'gotstop', from: 'echoing', to: 'confirm' },
      { name: 'confirmed', from: 'confirm', to: 'final' },
      { name: 'cancelled', from: 'confirm', to: 'echoing' },
      { name: 'invalid', from: 'confirm', to: 'confirm' }
    ]
  })
}
  `}</Code>

          <p>
            If you take a look at each event, they represent the transitions
            defined in the diagram. The states aren't explicitly listed, but
            you'll see all of them in the transitions. We can use that function
            in <code>respondTo</code> to get a new FSM for the conversation.
            Also, now we have a fancier way to check if the conversation has
            ended - we can use the method <code>isFinished</code> from the state
            machine to check for a final state. Let's update the code then:
          </p>

          <Code language="js" style={vs2015}>{`
async respondTo(message) {
  let fsm = createFsm()
  let lastReply = message

  while (!fsm.isFinished()) {
    let text = lastReply.text
    let event = eventFromStateAndMessageText(fsm.current, text)

    if (!event || fsm.cannot(event)) {
      this.client.sendMessage(message.chat.id, 'I wasn't expecting that, try /start')
      break
    }

    fsm[event](lastReply)

    let sentMessage = await lastMessage
    lastReply = await new Promise(resolve => this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, resolve))
  }
}
  `}</Code>

          <p>
            Besides using <code>fsm.isFinished()</code> as our{' '}
            <code>while</code> condition, we're using{' '}
            <code>fsm.cannot(event)</code>. This means that once we figured out
            what event corresponds to the received message, we can check if the
            machine can actually apply that transition. Otherwise, it means the
            user sent something we weren't expecting. This doesn't necessarily
            applies to this case, since we're already considering the current
            state when deciding which event we should trigger, but it's useful
            in more complex situations.
          </p>

          <p>
            Notice that we have a <code>lastMessage</code> variable that's not
            defined yet. Let's keep it there for now and we'll go back to it,
            but basically it holds the last message the bot sent, so we can then
            wait for a reply to it.
          </p>

          <p>
            Also notice that we're calling <code>fsm[event](lastReply)</code> to
            make the FSM transition states. The FSM has a method for each event
            we defined for it that will trigger such event. We can pass
            arbitrary parameters to that method, which we'll use later in the
            callbacks.
          </p>

          <p>
            Let's go to that <code>eventFromStateAndMessageText</code> function
            now. We'll pass the current machine state and the text from the last
            user reply, and expect to receive a string with the event. We
            consider the case where the event is <code>undefined</code>, because
            it can happen that given the current state, there's no valid event
            for the message we got. The kind of logic that'll go in this
            function goes something like "if I'm waiting for the /start command
            and I get the /start text, the event is 'gotstart'", "if I'm waiting
            for the name, whatever text I received generates the 'gotname'
            event" and so on:
          </p>

          <Code language="js" style={vs2015}>{`
function eventFromStateAndMessageText(state, text) {
  switch (state) {
  case 'waitingstart':
    return text === '/start' && 'gotstart'
    break
  case 'waitingname':
    return 'gotname'
    break
  case 'echoing':
    return text === '/stop' ? 'gotstop' : 'gottext'
    break
  case 'confirm':
    if (text === 'yes') {
      return 'confirmed'
    } else if (text === 'no') {
      return 'cancelled'
    } else {
      return 'invalid'
    }
  }
}
  `}</Code>

          <h3>Defining the machine's behavior</h3>

          <p>
            Now to the last part: where are we actually replying to the user?
            Well, the FSM provides us with a couple of callbacks, specifically
            when the machine enters and leaves a state, and before and after
            executing an event. Each have their use cases, but the way we
            thought our bot here I believe using the event callbacks makes sense
            - after I get /start, I want to ask for the name. After I got a
            name, I want to start echoing, and so on.
          </p>

          <p>
            We want to attach these callbacks to the machine inside{' '}
            <code>respondTo</code> though, because we need some context for them
            - we want the chat id we're responding to, and we want access to the
            Telegram client to be able to send messages back. So, before the{' '}
            <code>while</code> loop we'll define all the callbacks:
          </p>

          <Code language="js" style={vs2015}>{`
let name
let lastMessage

fsm.ongotstart = () => {
  lastMessage = this.client.sendMessage(message.chat.id,
                                        'Let's begin! What's your name?',
                                        { reply_markup: JSON.stringify({ force_reply: true }) })
}

fsm.ongotname = (event, from, to, message) => {
  name = message.text
  lastMessage = this.client.sendMessage(message.chat.id,
                                        \`Got it \${name}, I'll begin echoing your replies until you respond with /stop\`,
                                        { reply_markup: JSON.stringify({ force_reply: true }) })
}

fsm.ongottext = (event, from, to, message) => {
  lastMessage = this.client.sendMessage(message.chat.id,
                                        \`Echoing for \${name}: \${message.text}\`,
                                        { reply_markup: JSON.stringify({ force_reply: true }) })
}

/.../
  `}</Code>

          <p>
            I omitted some callbacks for brevity, but they're all pretty
            similar. That, I believe, is what makes modeling the bot as a FSM so
            useful. We can separate the transitions (I got this message and I
            was waiting for this other thing) from the actual behavior once a
            transition is applied. Our <code>oncancelled</code> callback knows
            that we were echoing and got a /stop command, that was then
            cancelled. All it has to do is send the appropriate message back.
            Not even transition to another state - the FSM will handle it.
          </p>

          <p>
            We defined two new variables that we'll need across different
            messages outside of the callbacks - <code>name</code>, where we'll
            store the name the user gives us for the current conversation, and
            the previously seen <code>lastMessage</code> so we can then wait for
            it to be sent and expect a reply if needed.
          </p>

          <p>
            And that's all there's to it! Take a look at the finished code on{' '}
            <a href="https://github.com/julioolvr/telegram-bot-example">
              Github
            </a>. Certainly more could be done to the bot. For instance, DRY up
            those <code>this.client.sendMessage</code> calls, and maybe create a
            custom class that wraps the FSM and can keep the context needed (in
            particular, <code>javascript-state-machine</code> has a{' '}
            <code>target</code> option to extend an existing instance of another
            class and turn it into a FSM). But I think in its current state it
            already shows how useful it is to model the bot as a FSM, and how
            clean and readable the code is using <code>async</code>/<code>
              await
            </code>.
          </p>

          <h2>Further reading</h2>

          <ul>
            <li>
              <a href="https://ponyfoo.com/articles/understanding-javascript-async-await">
                Understanding JavaScript’s async await
              </a>, by <a href="https://twitter.com/nzgb">@nzgb</a>
            </li>
            <li>
              <a href="https://github.com/yagop/node-telegram-bot-api">
                <code>node-telegram-bot-api</code>
              </a>
            </li>
            <li>
              <a href="https://github.com/jakesgordon/javascript-state-machine">
                <code>javascript-state-machine</code>
              </a>
            </li>
          </ul>
        </div>
      )}
    </PostLayout>
  );
};

export default Post;
