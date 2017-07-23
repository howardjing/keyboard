import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Editor from './keycap-editor';

injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
`;

const App = ({
}) => (
  <Router>
    <div>
      <Nav />
      <Content>
        <Route exact path="/" component={Editor} />
      </Content>
    </div>
  </Router>
);

const Nav = styled.nav`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  margin: 10px;
`;

export default App;
