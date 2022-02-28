import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const [ repository, setRepository ] = useState();
    const { loading, data } = useQuery(GET_REPOSITORY, {
        variables: {
            repositoryId: id,
        },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (data) {
            setRepository(data.repository);
        }
    }, [data]);

    return { repository, loading };
}

export default useRepository;