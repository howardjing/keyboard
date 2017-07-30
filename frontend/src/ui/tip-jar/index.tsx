import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTip, setSyncing as _setSyncing } from '../../domains/tip-jar/actions';
import { isSyncing } from '../../domains/tip-jar/selectors';
import Component from './component';

const mapStateToProps = (state) => ({
  syncing: isSyncing(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setSyncing: (syncing: boolean) => _setSyncing({ syncing }),
  onChange: createTip,
}, dispatch);

type PropTypes = {
  syncing: boolean,
  setSyncing: (syncing: boolean) => any,
  onChange: (token: stripe.Token, cents: number) => any,
};

const TipJar = ({
  syncing,
  setSyncing,
  onChange,
}: PropTypes) => (
  <Component syncing={syncing} setSyncing={setSyncing} onChange={onChange} />
);

export default connect(mapStateToProps, mapDispatchToProps)(TipJar);
