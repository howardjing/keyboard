import TipJar, { TipData } from '../../api/tip-jar';

const createTip = (tip: TipData) => (dispatch) => {
  return TipJar.tip(tip);
}

export {
  createTip,
};
