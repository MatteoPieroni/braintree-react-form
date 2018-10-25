import React from 'react';
import CardForm from './components/CardForm';


class App extends React.Component {

    constructor(props) {
        super(props);
        // API key
        this.CLIENT_AUTH = 'sandbox_wz9bqpq4_dqxt3x8m3smjt4gm';
    }

  render() {
    return (
        <div className="App">
            <CardForm authKey={this.CLIENT_AUTH} buttonRequested={true} />
      </div>
    );
  }
}

export default App;
