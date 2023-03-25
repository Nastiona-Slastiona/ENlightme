import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Readoom from 'components/Readoom/Readoom';
import store from 'src/store/store';

import './styles/reset.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Readoom />
    </Provider>
);