// Import necessary dependencies
import App from './app/App/App'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const rootElement = document.getElementById('root');

render(
  <Router>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>,
  rootElement
);
