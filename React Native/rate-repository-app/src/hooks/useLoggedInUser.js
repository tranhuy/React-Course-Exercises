import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SIGNED_IN_USER } from "../graphql/queries";

const useLoggedInUser = () => {
    const [ user, setUser ] = useState(null);

    const { loading, data } = useQuery(SIGNED_IN_USER, {
        fetchPolicy: 'cache-and-network',
    })

    useEffect(() => {
        if (data) {
            setUser(data.me);
        }
    }, [data]);

    return { user, loading }
}

export default useLoggedInUser;