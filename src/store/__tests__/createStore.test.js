import createStore from '../createStore';

const initialState = {
  count: 0
};
const reducer = (state = initialState, action) => action.type === 'ADD'
  ? { ...state, count: state.count + 1 }
  : state;

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change state if actions exist', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  test('should not change state if actions don\'t exist', () => {
    store.dispatch({ type: 'TEST_ACTION' });
    expect(store.getState().count).toBe(0);
  });

  test('should call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should NOT call subscriber function after unsubscription', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });

    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch asynchronously', async () => {
    await setTimeout(() => {
      store.dispatch({ type: 'ADD' });
    }, 500);

    await setTimeout(() => {
      expect(store.getState().count).toBe(1);
    }, 1000);
  });
});
