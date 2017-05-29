import { Record, List } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { Action } from '../../domains/actions';
import {
  setActiveSection, SetActiveSection,
  setActiveBackgroundColor, SetActiveBackgroundColor,
  setActiveLegendColor, SetActiveLegendColor,
} from './actions';
import Keyboard, { Keycap } from './keyboard';

const whenConsistent = <T, K>(
  list: List<T>,
  getter: (t: T) => K,
): K | null => {
  const first = list.first();
  if (!first) { return null; }
  const val = getter(first);

  if (list.skip(1).every((t) => getter(t) === val)) {
    return val;
  }

  return null;
}

type Section = 'base' | 'modifiers' | 'custom';
const isSection = (x: any): x is Section => {
  return x === 'base' || x === 'modifiers' || x === 'custom';
}

class KeycapEditor extends Record({
  activeSection: 'base',
  keyboard: Keyboard.build(),
}) {
  getBase(): string {
    return this.get('base');
  }

  getModifiers(): string {
    return this.get('modifiers');
  }

  getKeyboard(): Keyboard {
    return this.get('keyboard');
  }

  getActiveSection(): Section {
    return this.get('activeSection');
  }

  getActiveKeys(): List<Keycap> {
    const activeSection = this.getActiveSection();
    if (activeSection === 'base') {
      return this.getKeyboard().getBase();
    } else if (activeSection === 'modifiers') {
      return this.getKeyboard().getModifiers();
    } else {
      return <List<Keycap>>List();
    }
  }

  getActiveBackgroundColor(): string | null {
    return whenConsistent(this.getActiveKeys(), (key) =>
      key.getBackgroundColor()
    );
  }

  getActiveLegendColor(): string | null {
    return whenConsistent(this.getActiveKeys(), (key) =>
      key.getLegendColor()
    );
  }
}

const initialState = new KeycapEditor();

const handleSetActiveSection = (state: KeycapEditor, action: Action<SetActiveSection>) => (
  state.set('activeSection', action.payload.section)
);

const handleSetActiveBackgroundColor =
  (state: KeycapEditor, action: Action<SetActiveBackgroundColor>) => (
    state.update('keyboard', (keyboard: Keyboard) =>
      keyboard.setBackgroundColors(state.getActiveKeys(), action.payload.backgroundColor)
    )
  );

const handleSetActiveLegendColor =
  (state: KeycapEditor, action: Action<SetActiveLegendColor>) => (
    state.update('keyboard', (keyboard: Keyboard) =>
      keyboard.setLegendColors(state.getActiveKeys(), action.payload.legendColor)
    )
  )

export default createReducer(initialState, {
  [setActiveSection.type]: handleSetActiveSection,
  [setActiveBackgroundColor.type]: handleSetActiveBackgroundColor,
  [setActiveLegendColor.type]: handleSetActiveLegendColor,
});

export {
  KeycapEditor,
  Section,
  isSection
};
