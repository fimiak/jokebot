const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-2922538812-395750144999-VSsYPUyCwM2ZNgoiUOt6aCOW',
  name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':cat:'
  };

  // bot.postMessageToChannel('random', 'Get Ready to Laugh With @Jokebot!', params); Post to channel to begin with
});

// Error Handler

bot.on('error', () => {
  console.log('Error', error);
});

// Message Handler

bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Respond to data.text
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' yomomma')) {
    yoMommaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' dad')) {
    dadJoke();
  } else if (message.includes(' help')) {
    runHelp();
  }
}

// Tell a Chuck Norris joke
function chuckJoke() {
  axios.get('https://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':joy_cat:'
    };

    bot.postMessageToChannel('random', `Chuck Norris: ${joke}`, params);
  });
}

// Tell a Yo Mama joke
function yoMommaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':joy_cat:'
    };

    bot.postMessageToChannel('random', `Yo Momma: ${joke}`, params);
  });
}

// Tell a dad joke
function dadJoke() {
  const config = {
    headers: { Accept: 'application/json' }
  };

  axios.get('https://icanhazdadjoke.com/', config).then(res => {
    console.log(res.data);
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':joy_cat:'
    };

    bot.postMessageToChannel('random', `Dad: ${joke}`, params);
  });
}

// Tell a random joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 3) + 1;
  rand === 2 ? chuckJoke() : rand === 1 ? dadJoke() : yoMommaJoke();
}

// Show help text
function runHelp() {
  const params = {
    icon_emoji: ':crying_cat_face:'
  };

  bot.postMessageToChannel(
    'random',
    `Help: In the 'random' channel, type @jokebot with either 'chucknorris', 'yomomma', 'dad', or 'random' to get a joke.`,
    params
  );
}
