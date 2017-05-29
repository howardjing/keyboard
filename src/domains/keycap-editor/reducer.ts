import { Record, List } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { Action } from '../../domains/actions';
import {
  setActiveSection, SetActiveSection,
  setActiveBackgroundColor, SetActiveBackgroundColor,
  setActiveLegendColor, SetActiveLegendColor,
  setActiveKeycap, SetActiveKeycap,
  addActiveKeycap, AddActiveKeycap,
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
  keyboard: Keyboard.build(),
  activeSection: 'custom',
  activeKeyIds: List(),
}) {
  static build(): KeycapEditor {
    const keyboard = Keyboard.build();
    const activeKeyIds = keyboard.getModifiers().map(keycap => keycap.getId());

    return new this({
      keyboard,
      activeSection: 'modifiers',
      activeKeyIds,
    })
  }

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

  private getActiveKeyIds(): List<number> {
    return this.get('activeKeyIds');
  }
  getActiveKeys(): List<Keycap> {
    return this
      .getKeyboard()
      .getKeys(List.of(this.getActiveKeyIds()))
      .flatMap(id => id) as List<Keycap>;
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

const initialState = KeycapEditor.build();

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
  );


/**
 * WARNING: activeSection and activeKeys are tied together -- always update both!
 */
const handleSetActiveSection = (state: KeycapEditor, action: Action<SetActiveSection>) => {
  let activeKeyIds: List<number>;
  const getId = (key: Keycap) => key.getId();
  if (action.payload.section === 'base') {
    activeKeyIds = state.getKeyboard().getBase().map(getId) as List<number>;
  } else if (action.payload.section === 'modifiers') {
    activeKeyIds = state.getKeyboard().getModifiers().map(getId) as List<number>;
  } else {
    activeKeyIds = List() as List<number>;
  }
  return state
    .set('activeSection', action.payload.section)
    .set('activeKeyIds', activeKeyIds);
};

/**
 * overrides existing list of activeKeys
 */
const handleSetActiveKeycap =
  (state: KeycapEditor, action: Action<SetActiveKeycap>) => (
    state
      .set('activeSection', 'custom')
      .set('activeKeyIds', List.of(action.payload.keycap.getId()))
  );

const handleAddActiveKeycap =
  (state: Keycap, action: Action<AddActiveKeycap>) => (
    state
      .set('activeSection', 'custom')
      .update('activeKeyIds', keys => keys.push(action.payload.keycap.getId()))
  );

export default createReducer(initialState, {
  [setActiveBackgroundColor.type]: handleSetActiveBackgroundColor,
  [setActiveLegendColor.type]: handleSetActiveLegendColor,
  [setActiveSection.type]: handleSetActiveSection,
  [setActiveKeycap.type]: handleSetActiveKeycap,
  [addActiveKeycap.type]: handleAddActiveKeycap,
});

export {
  KeycapEditor,
  Section,
  isSection
};
