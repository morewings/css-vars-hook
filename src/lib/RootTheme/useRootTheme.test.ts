import {renderHook} from '@testing-library/react-hooks';

import {useRootTheme} from './useRootTheme';

const theme = {
  foo: 'bar',
};

describe('useRootTheme', () => {
  let root: HTMLElement;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    root = document.querySelector(':root');
  });

  it('renders and applies theme', () => {
    const {result} = renderHook(() => useRootTheme());
    expect(result.current).toMatchSnapshot();
    expect(window.getComputedStyle(root).cssText).toMatchSnapshot();
  });

  it('`setRootVariable` sets CSS variable value', () => {
    const {result} = renderHook(() => useRootTheme());
    const varName = 'foo';
    const varValue = 'baz';
    result.current.setVariable(varName, varValue);
    expect(root.style.getPropertyValue(`--${varName}`)).toBe(varValue);
  });

  it('`removeRootVariable` removes CSS variable', () => {
    const {result} = renderHook(() => useRootTheme());
    const varName = 'foo';
    result.current.removeVariable(varName);
    expect(root.style.getPropertyValue(`--${varName}`)).toBe('');
  });
});
