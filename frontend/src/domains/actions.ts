export interface Action<P> {
  type: string;
  payload: P;
}

export interface ActionCreator<P> {
  type: string;
  (p: P): Action<P>
}

const makeActionCreator = (path: string) => <P>(name: string): ActionCreator<P> => {
  const type = `keyboard/${path}/${name}`;
  return Object.assign((payload: P): Action<P> => ({
    type,
    payload,
  }), {
    type,
  });
}

const isType = <P>(action: Action<any>, actionCreator: ActionCreator<P>): action is Action<P> => (
  action.type === actionCreator.type
);

export {
  makeActionCreator,
  isType,
};

