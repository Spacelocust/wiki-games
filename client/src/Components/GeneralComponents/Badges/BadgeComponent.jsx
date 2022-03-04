import React from 'react';
import { createUseStyles } from 'react-jss';

function BadgeComponent({ className, children, variants = '#7952b3', position = 'start', onClick, url }) {
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
            textDecoration:'none',
            cursor: onClick ? 'pointer' : 'default',

            '& a' : {
                color: '#fff',
                textDecoration:'none',
            }
        }
    }))();

    return (
        <div className={`d-flex justify-content-${position} align-items-center`}>
            <span className={`${className} ${classes.badge}`}
                  style={{ backgroundColor: variants }}
                  onClick={() => onClick()}>
                {url ? <a href={url} target='_blank'>{children}</a> : children}
            </span>
        </div>
    );
}

export default BadgeComponent;
