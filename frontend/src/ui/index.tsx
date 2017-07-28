import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
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
      <Nav>
        <div><LinkHome to="/">home</LinkHome></div>
      </Nav>
      <Wrapper>
        <Content>
          <Route exact path="/" component={Editor} />
        </Content>
      </Wrapper>
    </div>
  </Router>
);

const Nav = styled.nav`
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eee;
`;

const LinkHome = styled(Link)`
  color: black;
  font-size: 18px;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 10px;
`;

export default App;
