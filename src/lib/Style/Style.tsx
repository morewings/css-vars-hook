/*eslint-disable ssr-friendly/no-dom-globals-in-react-fc*/
import React from 'react';
import ReactDOM from 'react-dom';

export const Style = () => {
    const styleComponent = (
        <style>{`
                .my-element {
                    background-color: #f00;
                }
            `}</style>
    );
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
    ReactDOM.createPortal(<meta name="i-am-cool-meta" content="here-is-my-conent" />, document.head);

    return (
        // @ts-ignore
        <div>{ReactDOM.createPortal(styleComponent, document.head)}</div>
    );
};
