import {renderHook} from '@testing-library/react-hooks';
import {useVariable, useTheme} from 'lib';

describe('lib exports shape', () => {
  it('has useTheme', () => {
    expect(useTheme).toMatchSnapshot();
    const {result} = renderHook(() => useTheme({}));
    expect(result.current).toMatchSnapshot();
  });

  it('has useVariable', () => {
    expect(useVariable).toMatchSnapshot();
    const {result} = renderHook(() => useVariable('foo', 'bar'));
    expect(result.current).toMatchSnapshot();
  });
});
