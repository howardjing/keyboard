import { Record, List, Map } from 'immutable';

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
const SPACEBAR = () => Keycap.build('', '', 6.25);
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

const UP = () => Keycap.build('↑');
const LEFT = () => Keycap.build('←');
const DOWN = () => Keycap.build('↓');
const RIGHT = () => Keycap.build('→');

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
    UP,
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

class Keyboard extends Record({
  contextual: section(),
  alphanumeric: section(),
  navigation: section(),
  arrows: section(),
}) {
  static build(): Keyboard {
    return new this({
      contextual: instantiateSection(CONTEXTUAL),
      alphanumeric: instantiateSection(ALPHANUMERIC),
      navigation: instantiateSection(NAVIGATION),
      arrows: instantiateSection(ARROWS),
    });
  }

  getContextual(): List<List<Keycap>> {
    return this.get('contextual');
  }

  getAlphanumeric(): List<List<Keycap>> {
    return this.get('alphanumeric');
  }

  getNavigation(): List<List<Keycap>> {
    return this.get('navigation');
  }

  getArrows(): List<List<Keycap>> {
    return this.get('arrows');
  }
}

class Keycap extends Record({
  id,
  primaryLabel: "",
  secondaryLabel: "",
  width: 1,
}) {
  static build(
    primaryLabel: string = '',
    secondaryLabel: string = '',
    width: number = 1,
  ): Keycap {
    return new this({
      id: id(),
      primaryLabel,
      secondaryLabel,
      width,
    });
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
}

export default Keyboard;
