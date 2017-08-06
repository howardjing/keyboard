import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTip } from '../../domains/tip-jar/actions';
import { TipData } from '../../api/tip-jar';
import Component from './component';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: createTip,
}, dispatch);

type PropTypes = {
  syncing: boolean,
  setSyncing: (syncing: boolean) => any,
  onSubmit: (tip: TipData) => any,
};

const TipJar = ({
  onSubmit,
}: PropTypes) => (
  <Component onSubmit={onSubmit} />
);

export default connect(undefined, mapDispatchToProps)(TipJar);
