import React from 'react';

import empty from '../../../../assets/images/empty/img-empty.jpg';

function CardDetails({ detail }) {
    return (
        <div className='d-flex align-items-center flex-column mx-2'>
            <img src={detail.portrait_url || detail.image_url || empty} alt="" style={{ height: '5rem' }}/>
            <p>{detail.name}</p>
        </div>
    );
}

export default CardDetails;
