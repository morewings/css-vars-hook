import {createRoot} from 'react-dom/client';
import {App} from './environment/App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// eslint-disable-next-line react/react-in-jsx-scope
root.render(<App />);
