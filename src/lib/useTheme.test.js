import {renderHook} from '@testing-library/react-hooks';
import {useTheme} from './useTheme';

const theme = {
  foo: 'bar',
};

describe('useTheme', () => {
  let element;

  beforeEach(() => {
    // eslint-disable-next-line fp/no-mutation
    element = document.createElement('div');
  });

  it('renders', () => {
    const {result} = renderHook(() => useTheme(theme));
    expect(result.current).toMatchSnapshot();
  });

  it('`setRef` sets HTMLElement reference to the `ref`', () => {
    const {result} = renderHook(() => useTheme(theme));
    result.current.setRef(element);
    expect(result.current.ref.current).toBe(element);
  });

  it('`style` converts `theme` param to style object', () => {
    const {result} = renderHook(() => useTheme(theme));
    expect(result.current.style).toMatchSnapshot();
  });

  it('`getVariable` gets CSS variable value', () => {
    const {result} = renderHook(() => useTheme(theme));
    const varName = 'foo';
    result.current.setRef(element);
    expect(result.current.getVariable(varName)).toBe(theme[varName]);
  });

  it('`setVariable` sets CSS variable value', () => {
    const {result} = renderHook(() => useTheme(theme));
    const varName = 'foo';
    const varValue = 'baz';
    result.current.setRef(element);
    result.current.setVariable(varName, varValue);
    expect(element.style.getPropertyValue(`--${varName}`)).toBe(varValue);
  });

  it('`removeVariable` removes CSS variable', () => {
    const {result} = renderHook(() => useTheme(theme));
    const varName = 'foo';
    result.current.setRef(element);
    result.current.removeVariable(varName);
    expect(element.style.getPropertyValue(`--${varName}`)).toBe('');
  });
});
