import {render} from '@testing-library/react';

import {libraryAPITestCase} from '@/lib/libraryAPITestCase.tsx';

import {LocalRoot} from './LocalRoot.tsx';

const themeFoo = {
    foo: 'foo',
};
const themeBar = {
    bar: 'bar',
};

describe('lib > LocalRoot', () => {
    it('renders children', () => {
        const children = 'foo';
        const {getByText} = render(<LocalRoot>{children}</LocalRoot>);
        expect(getByText(children)).toBeInTheDocument();
    });

    it('respects `as` prop', () => {
        const {rerender, asFragment} = render(<LocalRoot as="button" />);
        expect(asFragment()).toMatchSnapshot();
        rerender(<LocalRoot as="main" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('creates initial style based on `theme` prop', () => {
        const {getByTestId} = render(
            <LocalRoot data-testid="provider" theme={themeFoo} />
        );
        expect(getByTestId('provider').getAttribute('style')).toMatchSnapshot();
    });

    it('sets and updates initial style, using `setTheme` callback when `theme` prop changes', () => {
        const setTheme = jest.fn();
        const {rerender, getByTestId} = render(
            <LocalRoot data-testid="provider" theme={themeFoo} setTheme={setTheme} />
        );
        expect(setTheme).toHaveBeenCalledTimes(1);
        expect(setTheme).toHaveBeenCalledWith(themeFoo);
        expect(getByTestId('provider').getAttribute('style')).toMatchSnapshot();
        rerender(
            <LocalRoot data-testid="provider" theme={themeBar} setTheme={setTheme} />
        );
        expect(setTheme).toHaveBeenCalledTimes(2);
        expect(setTheme).toHaveBeenCalledWith(themeBar);
        expect(getByTestId('provider').getAttribute('style')).toMatchSnapshot();
    });

    libraryAPITestCase(LocalRoot, 'LocalRoot');
});
