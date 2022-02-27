import { useLazyQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {
    const [ getRepo ] = useLazyQuery(GET_REPOSITORY);

    const getRepository = async (repoId) => {
        const result = await getRepo({ variables: { repositoryId: repoId }});

        return result;
    }

    return [ getRepository ];
}

export default useRepository;