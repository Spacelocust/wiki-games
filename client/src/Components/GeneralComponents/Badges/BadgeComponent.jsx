import React from 'react';
import { createUseStyles } from 'react-jss';

function BadgeComponent({ className, children, variants = '#7952b3', position = 'start', onClick }) {
    const classes = (createUseStyles({
        badge: {
            borderRadius: '50rem',
            padding: '.35em .65em',
            fontWeight: 700,
            lineHeight: 1,
            color: '#fff',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'baseline',
            backgroundColor: variants,
            border: `1px solid ${variants}`,
            cursor: onClick ? 'pointer' : 'default',
        }
    }))();

    return (
        <div className={`d-flex justify-content-${position}`}>
            <span className={`${className} ${classes.badge}`} onClick={() => onClick()}>{children}</span>
        </div>
    );
}

export default BadgeComponent;
