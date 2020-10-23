import React from 'react';

const ExampleStyle = ({ rootId }) => <style media="only screen">
    {`
    html, body${rootId ? `, #${rootId}` : ''} {
        height: 100%;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
    }

    html {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        overflow: auto;
    }

    body {
        padding: 1rem;
        overflow: auto;
    }
    `}
</style>;

export default ExampleStyle;