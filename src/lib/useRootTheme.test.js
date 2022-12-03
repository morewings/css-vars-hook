import {renderHook} from '@testing-library/react-hooks';
import {useRootTheme} from './useRootTheme';

const theme = {
  foo: 'bar',
};

describe('useRootTheme', () => {
  let root;

  beforeEach(() => {
    // eslint-disable-next-line fp/no-mutation
    root = document.querySelector(':root');
  });

  it('renders and applies theme', () => {
    const {result} = renderHook(() => useRootTheme(theme));
    expect(result.current).toMatchSnapshot();
    expect(window.getComputedStyle(root).cssText).toMatchSnapshot();
  });

  it('`setRootVariable` sets CSS variable value', () => {
    const {result} = renderHook(() => useRootTheme(theme));
    const varName = 'foo';
    const varValue = 'baz';
    result.current.setRootVariable(varName, varValue);
    expect(root.style.getPropertyValue(`--${varName}`)).toBe(varValue);
  });

  it('`removeRootVariable` removes CSS variable', () => {
    const {result} = renderHook(() => useRootTheme(theme));
    const varName = 'foo';
    result.current.removeRootVariable(varName);
    expect(root.style.getPropertyValue(`--${varName}`)).toBe('');
  });
});
