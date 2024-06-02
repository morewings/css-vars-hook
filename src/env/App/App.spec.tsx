import {render} from '@testing-library/react';

import {App} from './App.tsx';

describe('env > App', () => {
    it('renders ', () => {
        const {asFragment} = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });
});
