import {renderHook} from '@testing-library/react-hooks';
import {useVariable} from './useVariable';

const varName = 'foo';
const varValue = 'bar';

describe('useTheme', () => {
  let element;

  beforeEach(() => {
    // eslint-disable-next-line fp/no-mutation
    element = document.createElement('div');
  });

  it('renders', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    expect(result.current).toMatchSnapshot();
  });

  it('`setRef` sets HTMLElement reference to the `ref`', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    result.current.setRef(element);
    expect(result.current.ref.current).toBe(element);
  });

  it('`style` converts `theme` param to style object', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    expect(result.current.style).toMatchSnapshot();
  });

  it('`getVariable` gets CSS variable value', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    result.current.setRef(element);
    expect(result.current.getVariable(varName)).toBe(varValue);
  });

  it('`setVariable` sets CSS variable value', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    result.current.setRef(element);
    result.current.setVariable('fizz', 'buzz');
    expect(element.style.getPropertyValue(`--fizz`)).toBe('buzz');
  });

  it('`removeVariable` removes CSS variable', () => {
    const {result} = renderHook(() => useVariable(varName, varValue));
    result.current.setRef(element);
    result.current.removeVariable(varName);
    expect(element.style.getPropertyValue(`--${varName}`)).toBe('');
  });
});
