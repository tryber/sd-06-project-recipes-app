const { loadState, saveState } = require('../services/localStorage');

// const mockLocalStorage = () => {
//   global.localStorage = jest.fn().mockResolvedValue({
//     getItem: (key) => { return key; },
//     setItem: (nameKey, callState) => [nameKey, callState],
//   });
// };

// const mockJSON = () => {
//   global.JSON = jest.fn().mockResolvedValue(() => console.log('ola'));
// };

describe('Test functions localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  // beforeAll(mockJSON);

  it('function saveState save state in localStorage', () => {
    const stateString = 'state Handle';
    const state = { state1: stateString };
    const nameKey = 'keyRandom';
    saveState(nameKey, state);
    expect(JSON.parse(localStorage.getItem(nameKey)).state1).toEqual(stateString);
  });

  it('function loadState returns the state if the key exists', () => {
    const state = { state1: 'state Handle' };
    const nameKey1 = 'keyRandom1';
    saveState(nameKey1, state);

    const initialValue = 'initialValue';
    const valueTrue = loadState(nameKey1, initialValue);
    expect(valueTrue).toEqual(state);
  });

  it('function loadState returns initialValue if the key not exists', () => {
    const nameKey = 'keyRandom';
    const initialValue = 'initialValue';
    const valueTrue = loadState(nameKey, initialValue);
    expect(valueTrue).toEqual(initialValue);
  });
});
