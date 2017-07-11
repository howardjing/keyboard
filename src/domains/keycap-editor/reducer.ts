import { Record, List, Collection, Set} from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as Color from 'color';
import { Action } from '../../domains/actions';
import {
  setActiveSection, SetActiveSection,
  setActiveBackgroundColor, SetActiveBackgroundColor,
  setActiveLegendColor, SetActiveLegendColor,
  setActiveKeycap, SetActiveKeycap,
  addActiveKeycap, AddActiveKeycap,
  setMouseDown, SetMouseDown,
  setCaseColor, SetCaseColor,
} from './actions';
import Keyboard, { Keycap } from './keyboard';
import * as foo from './actions';

const whenConsistent = <T, K>(
  list: Collection<T, T>,
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
  activeKeyIds: Set(),
  mouseDown: false,
  showRenderModal: false,
}) {
  static build(): KeycapEditor {
    const keyboard = Keyboard.build();
    const activeKeyIds = keyboard
      .getModifiers()
      .map(keycap => keycap.getId())
      .toSet();

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

  getActiveKeyIds(): Set<number> {
    return this.get('activeKeyIds');
  }

  getActiveKeys(): Set<Keycap> {
    return this
      .getKeyboard()
      .getKeys(this.getActiveKeyIds()) as any;
  }

  getActiveBackgroundColor(): Color | null {
    return whenConsistent(this.getActiveKeys(), (key) =>
      key.getBackgroundColor()
    );
  }

  getActiveLegendColor(): Color | null {
    return whenConsistent(this.getActiveKeys(), (key) =>
      key.getLegendColor()
    );
  }

  isMouseDown(): boolean {
    return this.get('mouseDown');
  }

  shouldShowRenderModal(): boolean {
    return this.get('showRenderModal');
  }
}

const initialState = KeycapEditor.build();

const handleSetActiveBackgroundColor =
  (state: KeycapEditor, action: Action<SetActiveBackgroundColor>) => (
    state.update('keyboard', (keyboard: Keyboard) =>
      keyboard.setBackgroundColors(state.getActiveKeys(), action.payload.color)
    )
  );

const handleSetActiveLegendColor =
  (state: KeycapEditor, action: Action<SetActiveLegendColor>) => (
    state.update('keyboard', (keyboard: Keyboard) =>
      keyboard.setLegendColors(state.getActiveKeys(), action.payload.color)
    )
  );

const handleSetCaseColor =
  (state: KeycapEditor, action: Action<SetCaseColor>) => (
    state.update('keyboard', (keyboard: Keyboard) =>
      keyboard.setCaseColor(action.payload.color)
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
 * adds the given keycap clearing out other active keycaps
 */
const handleSetActiveKeycap =
  (state: KeycapEditor, action: Action<SetActiveKeycap>) => {
    const keycapId = action.payload.keycap.getId();
    const newActiveKeyIds = Set.of(keycapId);

    return (
      state
        .set('activeSection', 'custom')
        .set('activeKeyIds', newActiveKeyIds)
    );
  }

/**
 * toggles the given keycap leaving other active keycaps alone
 */
const handleAddActiveKeycap =
  (state: KeycapEditor, action: Action<AddActiveKeycap>) => {
    const activeKeyIds = state.getActiveKeyIds();
    const keycapId = action.payload.keycap.getId();

    const newActiveKeyIds = activeKeyIds.includes(keycapId) ?
      activeKeyIds.delete(keycapId) :
      activeKeyIds.add(keycapId);

    return (
      state
        .set('activeSection', 'custom')
        .set('activeKeyIds', newActiveKeyIds)
    );
  };

const handleSetMouseDown =
  (state: KeycapEditor, action: Action<SetMouseDown>) => (
    state
      .set('mouseDown', action.payload.mouseDown)
  );

export default createReducer(initialState, {
  [setActiveBackgroundColor.type]: handleSetActiveBackgroundColor,
  [setActiveLegendColor.type]: handleSetActiveLegendColor,
  [setCaseColor.type]: handleSetCaseColor,
  [setActiveSection.type]: handleSetActiveSection,
  [setActiveKeycap.type]: handleSetActiveKeycap,
  [addActiveKeycap.type]: handleAddActiveKeycap,
  [setMouseDown.type]: handleSetMouseDown,
});

export {
  KeycapEditor,
  Section,
  isSection
};
