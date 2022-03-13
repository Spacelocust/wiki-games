import React, { useEffect, useState } from 'react';

import { getGameDetails } from '../../../../api/axiosBase';
import CardDetails from './CardDetails';
import { isEmpty, isNull } from 'lodash';
import PaginationComponent from '../../../GeneralComponents/Pagination/PaginationComponent';
import LoaderGif from '../../../LoaderComponents/LoaderGif';
import mf from '../../../../assets/images/gif/kled.webp';

function GameDetails({ slug }) {
    const [details, setDetails] = useState([]);
    const [load, setLoader] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, perPage: 15, maxPage: 0 });

    useEffect(() => {
        (async () => {
            try {
                setLoader(true);
                const { data } = await getGameDetails(slug, pagination.page, pagination.perPage);
                const { list, link } = data;

                setPagination({
                    ...pagination,
                    maxPage: (!isNull(link) ? parseInt(link.last !== undefined ? parseInt(link.last.page) : parseInt(link.prev.page) + 1) : 0)
                });
                setDetails(list);
                setLoader(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [slug, pagination.page]);

    const pageChange = ({ selected }) => setPagination({ ...pagination, page: selected + 1 });

    return (
        <div className="d-flex flex-column align-items-center">
            {!load ? !isEmpty(details) ?
                <div className="d-flex flex-wrap justify-content-center align-items-center">{details.map(detail => <CardDetails
                    key={detail.id} detail={detail}/>)}</div> : 'A venir prochainement...' : <LoaderGif img={mf} text='unset'/>}
            {!isEmpty(details) &&
                <PaginationComponent className="justify-content-center mt-2 mb-0" onPageChange={pageChange}
                                     pageCount={pagination.maxPage} forcePage={(pagination.page - 1)}/>}
        </div>
    );
}

export default GameDetails;
