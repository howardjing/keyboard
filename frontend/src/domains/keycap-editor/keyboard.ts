import { Record, List, Map, Collection, Set } from 'immutable';
import * as Color from 'color';

// mechanism for generating id
let _id = 0;
const id = () => {
  _id += 1;
  return _id;
}

const ESC = () => Keycap.build('ESC', 'Esc');
const F1 = () => Keycap.build('F1', 'F1');
const F2 = () => Keycap.build('F2', 'F2');
const F3 = () => Keycap.build('F3', 'F3');
const F4 = () => Keycap.build('F4', 'F4');
const F5 = () => Keycap.build('F5', 'F5');
const F6 = () => Keycap.build('F6', 'F6');
const F7 = () => Keycap.build('F7', 'F7');
const F8 = () => Keycap.build('F8', 'F8');
const F9 = () => Keycap.build('F9', 'F9');
const F10 = () => Keycap.build('F10', 'F10');
const F11 = () => Keycap.build('F11', 'F11');
const F12 = () => Keycap.build('F12', 'F12');
const PRINT_SCREEN = () => Keycap.build('PRINT_SCREEN', 'PrtSc');
const SCROLL_LOCK = () => Keycap.build('SCROLL_LOCK', 'ScrlLk');
const PAUSE = () => Keycap.build('PAUSE', 'Pause');

const BACKTICK = () => Keycap.build('BACKTICK', '`', '~');
const ONE = () => Keycap.build('ONE', '1', '!');
const TWO = () => Keycap.build('TWO', '2', '@');
const THREE = () => Keycap.build('THREE', '3', '#');
const FOUR = () => Keycap.build('FOUR', '4', '$');
const FIVE = () => Keycap.build('FIVE', '5', '%');
const SIX = () => Keycap.build('SIX', '6', '^');
const SEVEN = () => Keycap.build('SEVEN', '7', '&');
const EIGHT = () => Keycap.build('EIGHT', '8', '*');
const NINE = () => Keycap.build('NINE', '9', '(');
const ZERO = () => Keycap.build('ZERO', '0', ')');
const HYPHEN = () => Keycap.build('HYPHEN', '-', '_');
const EQUAL = () => Keycap.build('EQUAL', '=', '+');
const BACKSPACE = () => Keycap.build('BACKSPACE','Backspace', '', 2);

const TAB = () => Keycap.build('TAB', 'Tab', '', 1.5);
const Q = () => Keycap.build('Q', 'Q');
const W = () => Keycap.build('W', 'W');
const E = () => Keycap.build('E', 'E');
const R = () => Keycap.build('R', 'R');
const T = () => Keycap.build('T', 'T');
const Y = () => Keycap.build('Y', 'Y');
const U = () => Keycap.build('U', 'U');
const I = () => Keycap.build('I', 'I');
const O = () => Keycap.build('O', 'O');
const P = () => Keycap.build('P', 'P');
const LEFT_SQUARE_BRACKET = () => Keycap.build('LEFT_SQUARE_BRACKET', '[', '{');
const RIGHT_SQUARE_BRACKET = () => Keycap.build('RIGHT_SQUARE_BRACKET', ']', '}');
const BACKSLASH = () => Keycap.build('BACKSLASH', '\\', '|', 1.5);

const CAPS_LOCK = () => Keycap.build('CAPS_LOCK', 'Caps Lock', '', 1.75);
const A = () => Keycap.build('A', 'A');
const S = () => Keycap.build('S', 'S');
const D = () => Keycap.build('D', 'D');
const F = () => Keycap.build('F', 'F');
const G = () => Keycap.build('G', 'G');
const H = () => Keycap.build('H', 'H');
const J = () => Keycap.build('J', 'J');
const K = () => Keycap.build('K', 'K');
const L = () => Keycap.build('L', 'L');
const SEMI_COLON = () => Keycap.build('SEMI_COLON', ';', ':');
const SINGLE_QUOTE = () => Keycap.build('SINGLE_QUOTE', "'", '"');
const ENTER = () => Keycap.build('ENTER', 'Enter', '', 2.25);

const LEFT_SHIFT = () => Keycap.build('LEFT_SHIFT', 'Shift', '', 2.25);
const Z = () => Keycap.build('Z', 'Z');
const X = () => Keycap.build('X', 'X');
const C = () => Keycap.build('C', 'C');
const V = () => Keycap.build('V', 'V');
const B = () => Keycap.build('B', 'B');
const N = () => Keycap.build('N', 'N');
const M = () => Keycap.build('M', 'M');
const COMMA = () => Keycap.build('COMMA', ',', '<');
const PERIOD = () => Keycap.build('PERIOD', '.', '>');
const FORWARD_SLASH = () => Keycap.build('FORWARD_SLASH', '/', '?');
const RIGHT_SHIFT = () => Keycap.build('RIGHT_SHIFT', 'Shift', '', 2.75);

const LEFT_CONTROL = () => Keycap.build('LEFT_CONTROL', 'Ctrl', '', 1.25);
const LEFT_SUPER = () => Keycap.build('LEFT_SUPER', 'Super', '', 1.25);
const LEFT_ALT = () => Keycap.build('LEFT_ALT', 'Alt', '', 1.25);
const SPACEBAR = () => Keycap.build('SPACEBAR', '', '', 6.25, undefined, undefined, true);
const RIGHT_ALT = () => Keycap.build('RIGHT_ALT', 'Alt', '', 1.25);
const RIGHT_SUPER = () => Keycap.build('RIGHT_SUPER', 'Super', '', 1.25);
const MENU = () => Keycap.build('MENU', 'Menu', '', 1.25);
const RIGHT_CONTROL = () => Keycap.build('RIGHT_CONTROL', 'Ctrl', '', 1.25);

const INSERT = () => Keycap.build('INSERT', 'Insert');
const HOME = () => Keycap.build('HOME', 'Home');
const PAGE_UP = () => Keycap.build('PAGE_UP', 'PgUp');
const DELETE = () => Keycap.build('DELETE', 'Delete');
const END = () => Keycap.build('END', 'End');
const PAGE_DOWN = () => Keycap.build('PAGE_DOWN', 'PgDn');

const UP = () => Keycap.build('UP', 'Up');
const LEFT = () => Keycap.build('LEFT', 'Left');
const DOWN = () => Keycap.build('DOWN', 'Down');
const RIGHT = () => Keycap.build('RIGHT', 'Right');

const section = (...args) => List.of(...args);
const group = (...args) => List.of(...args);

const CONTEXTUAL = section(
  group(ESC),
  group(F1, F2, F3, F4),
  group(F5, F6, F7, F8),
  group(F9, F10, F11, F12),
  group(PRINT_SCREEN, SCROLL_LOCK, PAUSE),
);

const ALPHANUMERIC = section(
  group(
    BACKTICK, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, ZERO, HYPHEN, EQUAL, BACKSPACE,
  ),
  group(
    TAB, Q, W, E, R, T, Y, U, I, O, P, LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET, BACKSLASH,
  ),
  group(
    CAPS_LOCK, A, S, D, F, G, H, J, K, L, SEMI_COLON, SINGLE_QUOTE, ENTER,
  ),
  group(
    LEFT_SHIFT, Z, X, C, V, B, N, M, COMMA, PERIOD, FORWARD_SLASH, RIGHT_SHIFT,
  ),
  group(
    LEFT_CONTROL, LEFT_SUPER, LEFT_ALT, SPACEBAR, RIGHT_ALT, RIGHT_SUPER, MENU, RIGHT_CONTROL,
  ),
);

const NAVIGATION = section(
  group(
    INSERT, HOME, PAGE_UP,
  ),
  group(
    DELETE, END, PAGE_DOWN,
  ),
);

const ARROWS = section(
  group(
    UP
  ),
  group(
    LEFT, DOWN, RIGHT,
  ),
);

const instantiateSection = (section: List<List<() => Keycap>>): List<List<Keycap>> => (
  <List<List<Keycap>>>section.map(group =>
    group.map(fn => fn())
  )
);

const identity = x => x;

const toIds = (section: List<List<Keycap>>): List<List<number>> => (
  <List<List<number>>>section.map(group =>
    group.map(keycap => keycap.getId())
  )
);

const getModifiers = (
  contextual: List<List<Keycap>>,
  alphanumeric: List<List<Keycap>>,
  _navigation: List<List<Keycap>>,
  _arrows: List<List<Keycap>>
): List<Keycap> => {
  const esc = contextual.get(0);
  const f5ToF9 = contextual.get(2);
  const print = contextual.get(4);

  const navigation = _navigation.flatMap(identity);
  const arrows = _arrows.flatMap(identity);

  const backspace = alphanumeric.get(0).last();
  const tab = alphanumeric.get(1).first();
  const capslock = alphanumeric.get(2).first();
  const enter = alphanumeric.get(2).last();
  const leftShift = alphanumeric.get(3).first();
  const rightShift = alphanumeric.get(3).last();

  const leftMods = alphanumeric.get(4).take(3);
  const rightMods = alphanumeric.get(4).skip(4);

  return <List<Keycap>>esc
    .concat(f5ToF9)
    .concat(print)
    .concat(navigation)
    .concat(arrows)
    .concat(List.of(
      backspace,
      tab,
      capslock,
      enter,
      leftShift,
      rightShift,
    ))
    .concat(leftMods)
    .concat(rightMods);
};

const getBase = (
  contextual: List<List<Keycap>>,
  alphanumeric: List<List<Keycap>>,
): List<Keycap> => {
  const f1ToF4 = contextual.get(1);
  const f9Tof12 = contextual.get(3);

  const numbers = alphanumeric.get(0).skipLast(1);
  const qwerty = alphanumeric.get(1).skip(1);
  const asdf = alphanumeric.get(2).skip(1).skipLast(1);
  const zxcv = alphanumeric.get(3).skip(1).skipLast(1);

  const space = alphanumeric.get(4).get(3);

  return <List<Keycap>>numbers
    .concat(f1ToF4)
    .concat(f9Tof12)
    .concat(qwerty)
    .concat(asdf)
    .concat(zxcv)
    .concat(List.of(space));
};

const addColor = (
  keycaps: List<Keycap>,
  background: Color.Color,
  legend: Color.Color = Color('#000')
): List<Keycap> => (
  keycaps.map(keycap => (
    keycap
      .setBackgroundColor(background)
      .setLegendColor(legend)
  )) as List<Keycap>
);

type KeycapColor = {
  background: Color.Color,
  legend: Color.Color,
};

const overrideColors = (
  keycaps: List<Keycap>,
  overrides: Map<string, KeycapColor>,
): List<Keycap> => (
  keycaps.map(keycap => {
    const override = overrides.get(keycap.getType());

    if (override) {
      return keycap
        .setBackgroundColor(override.background)
        .setLegendColor(override.legend);
    }

    return keycap;
  }) as List<Keycap>
);

const keycapColorToString = (keycapColor: KeycapColor): string => (
  `${keycapColor.background.hex()},${keycapColor.legend.hex()}`
);

const stringToKeycapColor = (string: string): KeycapColor => {
  const [ background, legend ] = string.split(',');
  return {
    background: Color(background),
    legend: Color(legend),
  };
};

const mostCommonColor = (keycaps: List<Keycap>): KeycapColor => {
  const { maxKeycapColor } = keycaps.reduce(({
      maxKeycapColor,
      maxCount,
      mapping,
    }, keycap) => {

    const keycapColor = {
      background: keycap.getBackgroundColor(),
      legend: keycap.getLegendColor(),
    };

    const key = keycapColorToString(keycapColor);
    const updatedMapping = mapping.update(key, 0, count => count += 1);
    const updatedCount = updatedMapping.get(key);

    if (updatedCount >= maxCount) {
      return {
        maxKeycapColor: keycapColor,
        maxCount: updatedCount,
        mapping: updatedMapping,
      }
    }

    return {
      maxKeycapColor,
      maxCount,
      mapping: updatedMapping,
    }
  }, {
    // local maxima
    maxKeycapColor: null,
    maxCount: 0,

    // mapping of colors -> timesSeen
    mapping: Map() as Map<string, number>,
  });

  return maxKeycapColor;
};


const findOverrides = (keycaps: List<Keycap>, keycapColor: KeycapColor): Map<string, KeycapColor> => {
  const ignore = keycapColorToString(keycapColor);

  return keycaps.reduce((mapping, keycap) => {
    const keycapColor = {
      background: keycap.getBackgroundColor(),
      legend: keycap.getLegendColor(),
    };

    if (keycapColorToString(keycapColor) === ignore) {
      return mapping;
    }

    return mapping.set(keycap.getType(), keycapColor);
  }, Map());
};

class Keyboard extends Record({
  contextual: section(),
  alphanumeric: section(),
  navigation: section(),
  arrows: section(),
  keycaps: Map(),
  caseColor: Color('#2d2d2d'),
}) {
  static build({
    base,
    modifier,
    overrides,
  }: {
    base: KeycapColor,
    modifier: KeycapColor,
    overrides: Map<string, KeycapColor>,
  } = {
    base: {
      background: Color('#393B3B'),
      legend: Color('#fff'),
    },
    modifier: {
      background: Color('#393B3B'),
      legend: Color('#fff'),
    },
    overrides: Map(),
  }): Keyboard {
    const contextual = instantiateSection(CONTEXTUAL);
    const alphanumeric = instantiateSection(ALPHANUMERIC);
    const navigation = instantiateSection(NAVIGATION);
    const arrows = instantiateSection(ARROWS);

    const baseKeys = getBase(contextual, alphanumeric);
    const modifierKeys = getModifiers(contextual, alphanumeric, navigation, arrows);

    const keycaps = overrideColors(
      addColor(baseKeys, base.background, base.legend).concat(
        addColor(modifierKeys, modifier.background, modifier.legend)
      ) as List<Keycap>,
      overrides,
    );

    const keycapIds = <List<number>>keycaps.map((keycap) => keycap.getId());
    const keycapMapping = Map(keycapIds.zip(keycaps));

    return new this({
      contextual: toIds(contextual),
      alphanumeric: toIds(alphanumeric),
      navigation: toIds(navigation),
      arrows: toIds(arrows),
      keycaps: keycapMapping,
    });
  }

  getColors(): {
    base: KeycapColor,
    modifier: KeycapColor,
    overrides: Map<string, KeycapColor>,
  } {
    const baseKeys = this.getBase();
    const modifiersKeys = this.getModifiers();

    const baseColor = mostCommonColor(baseKeys);
    const modifierColor = mostCommonColor(modifiersKeys);
    const baseOverrides = findOverrides(baseKeys, baseColor);
    const modifierOverrides = findOverrides(modifiersKeys, modifierColor);

    return {
      base: baseColor,
      modifier: modifierColor,
      overrides: baseOverrides.merge(modifierOverrides),
    };
  }

  private getKey(keyId: number): Keycap | null {
    return this.getIn(['keycaps', keyId]) || null;
  }

  getKeys(keyIds: Collection<number, number>): Collection<number, Keycap> {
    return keyIds
      .map(id => this.getKey(id))
      .filter(keycap => keycap !== null) as Collection<number, Keycap>;
  }

  private getNestedKeys(nestedKeyIds: List<List<number>>): List<List<Keycap>> {
    return nestedKeyIds.map(keyIds => this.getKeys(keyIds)) as List<List<Keycap>>;
  }

  /**
   * top row from esc to pause
   */
  getContextual(): List<List<Keycap>> {
    const contextual: List<List<number>> = this.get('contextual');
    return this.getNestedKeys(contextual);
  }

  /**
   * keys for 60%
   */
  getAlphanumeric(): List<List<Keycap>> {
    const alphanumeric: List<List<number>> = this.get('alphanumeric');
    return this.getNestedKeys(alphanumeric);
  }

  /**
   * ins / del / home / end / page up / page down
   */
  getNavigation(): List<List<Keycap>> {
    const navigation: List<List<number>> = this.get('navigation');
    return this.getNestedKeys(navigation);
  }

  /**
   * arrows
   */
  getArrows(): List<List<Keycap>> {
    const arrows: List<List<number>> = this.get('arrows');
    return this.getNestedKeys(arrows);
  }

  getModifiers(): List<Keycap> {
    return getModifiers(
      this.getContextual(),
      this.getAlphanumeric(),
      this.getNavigation(),
      this.getArrows(),
    );
  }

  getBase(): List<Keycap> {
    return getBase(
      this.getContextual(),
      this.getAlphanumeric(),
    );
  }

  getCaseColor(): Color.Color {
    return this.get('caseColor');
  }

  getKeycaps(): List<Keycap> {
    return this.get('keycaps').toList();
  }

  getPalette(): List<Color.Color> {
    const keys = this.getKeycaps();

    return (Map() as Map<string, Color.Color>).withMutations(map => {
      keys.forEach((key: Keycap) => {
        const background = key.getBackgroundColor();
        const legend = key.getLegendColor();
        map.set(background.rgb().string(), background);
        map.set(legend.rgb().string(), legend);
      });
    }).toList();
  }

  private setKeycaps(keycaps: Set<Keycap>, updater: (keycap: Keycap) => Keycap): this {
    return <this>this.withMutations(keyboard => {
      keycaps.forEach(keycap => {
       const oldKeycap = this.getIn(['keycaps', keycap.getId()]);
        if (!oldKeycap) { return; }

        // not sure if updateIn can be used with withMutations
        keyboard.setIn(
          ['keycaps', keycap.getId()],
          updater(oldKeycap),
        );
      });
    })
  }

  setBackgroundColors(keycaps: Set<Keycap>, color: Color.Color): this {
    return this.setKeycaps(keycaps, (keycap) => {
      return keycap.setBackgroundColor(color)
    });
  }

  setLegendColors(keycaps: Set<Keycap>, color: Color.Color): this {
    return this.setKeycaps(keycaps, (keycap) =>
      keycap.setLegendColor(color)
    );
  }

  setCaseColor(color: Color.Color): this {
    return this.set('caseColor', color) as this;
  }
}


class Keycap extends Record({
  id,
  type: "",
  primaryLabel: "",
  secondaryLabel: "",
  width: 1,
  backgroundColor: Color('#91867a'),
  legendColor: Color('#000'),
  convex: false,
}) {
  static build(
    type: string,
    primaryLabel: string = '',
    secondaryLabel: string = '',
    width: number = 1,
    backgroundColor: Color.Color | undefined = undefined,
    legendColor: Color.Color | undefined = undefined,
    convex: boolean = false,
  ): Keycap {
    const params = {
      id: id(),
      type,
      primaryLabel,
      secondaryLabel,
      width,
      backgroundColor,
      legendColor,
      convex,
    }

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    return new this(params);
  }

  getId(): number {
    return this.get('id');
  }

  getType(): string {
    return this.get('type');
  }

  getPrimaryLabel(): string {
    return this.get('primaryLabel');
  }

  getSecondaryLabel(): string {
    return this.get('secondaryLabel');
  }

  getWidth(): number {
    return this.get('width');
  }

  getBackgroundColor(): Color.Color {
    return this.get('backgroundColor');
  }

  getLegendColor(): Color.Color {
    return this.get('legendColor');
  }

  isConvex(): boolean {
    return this.get('convex');
  }

  setBackgroundColor(color: Color.Color): this {
    return <this>this.set('backgroundColor', color);
  }

  setLegendColor(color: Color.Color): this {
    return <this>this.set('legendColor', color);
  }
}

export default Keyboard;
export { Keycap, KeycapColor };
