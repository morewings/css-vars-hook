import type {FC} from 'react';
import {createRef} from 'react';
import {render} from '@testing-library/react';

/**
 * Test utility containing a set of tests to cover Library API features.
 * @see https://storybook.olxtech.pl/?path=/docs/experimental-library-api--page
 * @see LibraryProps
 * @example
 * // inside test file
 * libraryAPITestCase(
 *  // provide a Component to test
 *  Accordion,
 *  // Set name to label tests
 *  'Accordion',
 *  // Add props required to run component
 *  { content: itemSingleComponent }
 *  );
 */
export const libraryAPITestCase = <TProps,>(
    Component: FC<TProps>,
    name: string,
    defaultProps = {} as TProps
) => {
    describe(`${name} - Native API`, () => {
        const propValue = 'bar';

        it('renders provided `data-` attributes', () => {
            const name = 'foo';

            const {getByTestId} = render(
                <Component
                    {...defaultProps}
                    data-foo={propValue}
                    data-testid={propValue}
                    className={propValue}
                />
            );
            expect(getByTestId(propValue)).toHaveAttribute(`data-${name}`, propValue);
            expect(getByTestId(propValue)).toHaveAttribute('data-testid', propValue);
        });

        it.each(['id', 'role'])('renders native string props', propName => {
            const {getByTestId} = render(
                <Component
                    {...defaultProps}
                    data-testid={propValue}
                    {...{[propName]: propValue}}
                />
            );
            expect(getByTestId(propValue)).toHaveAttribute(propName, propValue);
        });

        it('renders `className` prop', () => {
            const {getByTestId} = render(
                <Component
                    {...defaultProps}
                    data-testid={propValue}
                    className={propValue}
                />
            );
            expect(getByTestId(propValue).getAttribute('class')).toMatch(propValue);
        });

        it('accepts ref as a callback', () => {
            const ref = jest.fn();
            render(<Component {...defaultProps} ref={ref} />);
            expect(ref.mock.calls[0][0]).toMatchSnapshot();
        });

        it('accepts ref as a Mutable Object', () => {
            const ref = createRef<HTMLInputElement>();
            render(<Component {...defaultProps} ref={ref} />);
            expect(ref.current).toMatchSnapshot();
        });
    });
};
