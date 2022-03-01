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
            cursor: onClick ? 'pointer' : 'default'
        }
    }))();

    return (
        <div className={`d-flex justify-content-${position} align-items-center`}>
            <span className={`${className} ${classes.badge}`}
                  style={{ backgroundColor: variants }}
                  onClick={() => onClick()}>{children}
            </span>
        </div>
    );
}

export default BadgeComponent;
