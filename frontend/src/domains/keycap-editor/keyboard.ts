import { Record, List, Map, Collection, Set } from 'immutable';
import * as Color from 'color';

// mechanism for generating id
let _id = 0;
const id = () => {
  _id += 1;
  return _id;
}

const ESC = () => Keycap.build('Esc');
const F1 = () => Keycap.build('F1');
const F2 = () => Keycap.build('F2');
const F3 = () => Keycap.build('F3');
const F4 = () => Keycap.build('F4');
const F5 = () => Keycap.build('F5');
const F6 = () => Keycap.build('F6');
const F7 = () => Keycap.build('F7');
const F8 = () => Keycap.build('F8');
const F9 = () => Keycap.build('F9');
const F10 = () => Keycap.build('F10');
const F11 = () => Keycap.build('F11');
const F12 = () => Keycap.build('F12');
const PRINT_SCREEN = () => Keycap.build('PrtSc');
const SCROLL_LOCK = () => Keycap.build('ScrlLk');
const PAUSE = () => Keycap.build('Pause');

const BACKTICK = () => Keycap.build('`', '~');
const ONE = () => Keycap.build('1', '!');
const TWO = () => Keycap.build('2', '@');
const THREE = () => Keycap.build('3', '#');
const FOUR = () => Keycap.build('4', '$');
const FIVE = () => Keycap.build('5', '%');
const SIX = () => Keycap.build('6', '^');
const SEVEN = () => Keycap.build('7', '&');
const EIGHT = () => Keycap.build('8', '*');
const NINE = () => Keycap.build('9', '(');
const ZERO = () => Keycap.build('0', ')');
const HYPHEN = () => Keycap.build('-', '_');
const EQUAL = () => Keycap.build('=', '+');
const BACKSPACE = () => Keycap.build('Backspace', '', 2);

const TAB = () => Keycap.build('Tab', '', 1.5);
const Q = () => Keycap.build('Q');
const W = () => Keycap.build('W');
const E = () => Keycap.build('E');
const R = () => Keycap.build('R');
const T = () => Keycap.build('T');
const Y = () => Keycap.build('Y');
const U = () => Keycap.build('U');
const I = () => Keycap.build('I');
const O = () => Keycap.build('O');
const P = () => Keycap.build('P');
const LEFT_SQUARE_BRACKET = () => Keycap.build('[', '{');
const RIGHT_SQUARE_BRACKET = () => Keycap.build(']', '}');
const BACKSLASH = () => Keycap.build('\\', '|', 1.5);

const CAPSLOCK = () => Keycap.build('Caps Lock', '', 1.75);
const A = () => Keycap.build('A');
const S = () => Keycap.build('S');
const D = () => Keycap.build('D');
const F = () => Keycap.build('F');
const G = () => Keycap.build('G');
const H = () => Keycap.build('H');
const J = () => Keycap.build('J');
const K = () => Keycap.build('K');
const L = () => Keycap.build('L');
const SEMI_COLON = () => Keycap.build(';', ':');
const SINGLE_QUOTE = () => Keycap.build("'", '"');
const ENTER = () => Keycap.build('Enter', '', 2.25);

const LEFT_SHIFT = () => Keycap.build('Shift', '', 2.25);
const Z = () => Keycap.build('Z');
const X = () => Keycap.build('X');
const C = () => Keycap.build('C');
const V = () => Keycap.build('V');
const B = () => Keycap.build('B');
const N = () => Keycap.build('N');
const M = () => Keycap.build('M');
const COMMA = () => Keycap.build(',', '<');
const PERIOD = () => Keycap.build('.', '>');
const FORWARD_SLASH = () => Keycap.build('/', '?');
const RIGHT_SHIFT = () => Keycap.build('Shift', '', 2.75);

const LEFT_CONTROL = () => Keycap.build('Ctrl', '', 1.25);
const LEFT_SUPER = () => Keycap.build('Super', '', 1.25);
const LEFT_ALT = () => Keycap.build('Alt', '', 1.25);
const SPACEBAR = () => Keycap.build('', '', 6.25, undefined, undefined, true);
const RIGHT_ALT = () => Keycap.build('Alt', '', 1.25);
const RIGHT_SUPER = () => Keycap.build('Super', '', 1.25);
const MENU = () => Keycap.build('Menu', '', 1.25);
const RIGHT_CONTROL = () => Keycap.build('Ctrl', '', 1.25);

const INSERT = () => Keycap.build('Insert');
const HOME = () => Keycap.build('Home');
const PAGE_UP = () => Keycap.build('PgUp');
const DELETE = () => Keycap.build('Delete');
const END = () => Keycap.build('End');
const PAGE_DOWN = () => Keycap.build('PgDn');

const UP = () => Keycap.build('Up');
const LEFT = () => Keycap.build('Left');
const DOWN = () => Keycap.build('Down');
const RIGHT = () => Keycap.build('Right');

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
    CAPSLOCK, A, S, D, F, G, H, J, K, L, SEMI_COLON, SINGLE_QUOTE, ENTER,
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

class Keyboard extends Record({
  contextual: section(),
  alphanumeric: section(),
  navigation: section(),
  arrows: section(),
  keycaps: Map(),
  caseColor: Color('#2d2d2d'),
}) {
  static build(): Keyboard {
    const contextual = instantiateSection(CONTEXTUAL);
    const alphanumeric = instantiateSection(ALPHANUMERIC);
    const navigation = instantiateSection(NAVIGATION);
    const arrows = instantiateSection(ARROWS);

    const keycaps = <List<Keycap>>contextual.flatMap(identity)
      .concat(alphanumeric.flatMap(identity))
      .concat(navigation.flatMap(identity))
      .concat(arrows.flatMap(identity));

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
    const contextual = this.getContextual();
    const esc = contextual.get(0);
    const f5ToF9 = contextual.get(2);
    const print = contextual.get(4);

    const navigation = this.getNavigation().flatMap(identity);
    const arrows = this.getArrows().flatMap(identity);

    const alphanumeric = this.getAlphanumeric();

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
  }

  getBase(): List<Keycap> {
    const contextual = this.getContextual();
    const f1ToF4 = contextual.get(1);
    const f9Tof12 = contextual.get(3);

    const alphanumeric = this.getAlphanumeric();

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
  }

  getCaseColor(): Color.Color {
    return this.get('caseColor');
  }

  getKeycaps(): List<Keycap> {
    return this.get('keycaps').toList();
  }

  getPallet(): List<Color.Color> {
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
  primaryLabel: "",
  secondaryLabel: "",
  width: 1,
  backgroundColor: Color('#91867a'),
  legendColor: Color('#000'),
  convex: false,
}) {
  static build(
    primaryLabel: string = '',
    secondaryLabel: string = '',
    width: number = 1,
    backgroundColor: Color.Color | undefined = undefined,
    legendColor: Color.Color | undefined = undefined,
    convex: boolean = false,
  ): Keycap {
    const params = {
      id: id(),
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
export { Keycap };
