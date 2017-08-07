import { Record, List, Collection, Set, Map } from 'immutable';
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
  selectKeycapsWithColor, SelectKeycapsWithColor,
  shiftColor, ShiftColor,
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
  keyboard: null,
  activeSection: 'base',
  activeKeyIds: Set(),
  mouseDown: false,
  showRenderModal: false,
}) {
  static build(): KeycapEditor {
    const keyboard = Keyboard.build({
      baseColor: {
        background: Color('#ACA693'),
        legend: Color('#171718'),
      },
      modifierColor: {
        background: Color('#67635B'),
        legend: Color('#171718'),
      },
      overrides: Map({
        ESC: {
          background: Color('#8D242F'),
          legend: Color('#171718'),
        }
      })
    });
    const activeKeyIds = keyboard
      .getBase()
      .map(keycap => keycap.getId())
      .toSet();

    return new this({
      keyboard,
      activeSection: 'base',
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

  getActiveBackgroundColor(): Color.Color | null {
    return whenConsistent(this.getActiveKeys(), (key) =>
      key.getBackgroundColor()
    );
  }

  getActiveLegendColor(): Color.Color | null {
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

/**
 * TODO: not sure if necessary -- maybe can just use equality check?
 */
const isEqual = (a: Color.Color, b: Color.Color) =>
  a.red() === b.red() && a.green() === b.green() && a.blue() === b.blue();

const handleSelectKeycapsWithColor = (
  state: KeycapEditor,
  action: Action<SelectKeycapsWithColor>
) => {
  const { color } = action.payload;
  const keycaps = state.getKeyboard().getKeycaps();
  const activeKeyIds = Set().withMutations(set => {
    keycaps.forEach(cap => {
      if (
        isEqual(cap.getBackgroundColor(), color) ||
        isEqual(cap.getLegendColor(), color)
      ) {
        set.add(cap.getId());
      }
    });
  });

  return (
    state
      .set('activeSection', 'custom')
      .set('activeKeyIds', activeKeyIds)
  );
};

const handleShiftColor = (state: KeycapEditor, action: Action<ShiftColor>) => {
  const { from, to } = action.payload;
  const keys = state.getActiveKeys();
  const background = keys.filter(cap => isEqual(cap.getBackgroundColor(), from)) as Set<Keycap>;
  const legend = keys.filter(cap => isEqual(cap.getLegendColor(), from)) as Set<Keycap>;
  return state.update('keyboard', (keyboard: Keyboard) => (
    keyboard
      .setBackgroundColors(background, to)
      .setLegendColors(legend, to)
  ));
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
  [selectKeycapsWithColor.type]: handleSelectKeycapsWithColor,
  [shiftColor.type]: handleShiftColor,
  [setMouseDown.type]: handleSetMouseDown,
});

export {
  KeycapEditor,
  Section,
  isSection
};
