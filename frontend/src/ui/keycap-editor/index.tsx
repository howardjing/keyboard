import * as React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Color from 'color';
import { KeycapEditor, EditorConfig } from '../../domains/keycap-editor/reducer';
import { buildEditor as _buildEditor } from '../../domains/keycap-editor/actions';
import { extractColors } from '../../domains/keycap-editor/sharing';
import { getEditor } from '../../domains/keycap-editor/selectors';
import Container from './container';

const mapStateToProps = state => ({
  editor: getEditor(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  buildEditor: (config: EditorConfig) => _buildEditor({ config }),
}, dispatch);

type PropTypes = {
  // from mapStateToProps
  editor: KeycapEditor,

  // from mapDispatchToProps
  buildEditor: (config: EditorConfig) => any,

  // from router
  location: {
    search: string,
  },
};

class Editor extends React.PureComponent<PropTypes, {}> {
  componentWillMount() {
    const { buildEditor, location } = this.props;
    const colors = extractColors(location.search) || {
      base: {
        background: Color('#ACA693'),
        legend: Color('#171718'),
      },
      modifier: {
        background: Color('#67635B'),
        legend: Color('#171718'),
      },
      overrides: Map({
        ESC: {
          background: Color('#8D242F'),
          legend: Color('#171718'),
        },
      })
    }
    buildEditor({ colors });
  }

  render() {
    const { editor } = this.props;
    return <Container editor={editor} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
