import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }, searchKeyword) => {
    const [ repositories, setRepositories ] = useState();
    //const [ loading, setLoading ] = useState(false);

    //GRAPHQL
    const { loading, data } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { 
            orderBy, 
            orderDirection,
            searchKeyword
        }
    })

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);

    //REST API
    // const fetchRepositories = async () => {
    //     setLoading(true);

        
    //     const response = await fetch('http://192.168.0.14:5000/api/repositories');
    //     const json = await response.json();

    //     setLoading(loading);
    //     setRepositories(json)
    // };

    return { repositories, loading }
}

export default useRepositories;