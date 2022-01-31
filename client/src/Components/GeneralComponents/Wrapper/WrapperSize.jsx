import React from 'react';

function WrapperSize({ children }) {
    return (
        <div style={{fontSize: '0.9em'}}>
            {children}
        </div>
    );
}

export default WrapperSize;