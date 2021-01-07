import React from 'react';
import ReactDOM from 'react-dom';

const {NODE_ENV} = process.env;
const modeEmoji = NODE_ENV === 'production' ? '🚀' : '🛠';
const App = () => <h1>Hello World! 👋 This app is running in {NODE_ENV} mode {modeEmoji}!</h1>

ReactDOM.render(<App />, document.querySelector('.container'));