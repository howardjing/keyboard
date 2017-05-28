import * as React from 'react';
import Editor from './keycap-editor';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const App = ({
}) => (
  <div>
    <h3>Keycap Renderer</h3>
    <Editor />
  </div>
);

export default App;
