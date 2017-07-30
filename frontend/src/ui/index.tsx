import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import * as HomeIcon from 'react-icons/lib/fa/home';
import * as MoneyIcon from 'react-icons/lib/fa/money';
import Editor from './keycap-editor';
import TipJar from './tip-jar';
injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`;

const year = new Date().getFullYear();

const App = ({
}) => (
  <Router>
    <AppWrapper>
      <Nav>
        <div><NavLink to="/"><HomeIcon /><Item>home</Item></NavLink></div>
      </Nav>
      <ContentWrapper>
        <Content>
          <Route exact path="/" component={Editor} />
          <Route exact path="/tip-jar" component={TipJar} />
        </Content>
      </ContentWrapper>
      <Footer>
        <FooterLink to="/tip-jar"><MoneyIcon /><Item>Tip Jar</Item></FooterLink>
        <div>© {year} Howard Jing</div>
      </Footer>
    </AppWrapper>
  </Router>
);

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding: 20px 10px;
`;

const NavLink = styled(Link)`
  color: black;
  font-size: 18px;
  text-decoration: none;
`;

const Item = styled.span`
  vertical-align: middle;
  &::before {
    content: ' ';
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
`;

const Content = styled.div`
  flex: 1 0 auto;
  max-width: 1440px;
  margin: 10px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  padding: 10px;
  font-size: 14px;
`;

const FooterLink = styled(Link)`
  margin-right: 20px;
  text-decoration: none;
  color: #0000ff;
`;

export default App;
