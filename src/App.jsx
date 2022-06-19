import React from 'react';
import Routes from './routes/Routes';

class App extends React.Component {
  render() {
    return (
      <main className="bg-gray-900 min-h-screen">
        <Routes />
      </main>
    );
  }
}

export default App;
