import { getUsers } from "../lib/data"

export default async function Profil() {

    /*
Vaaarial2@gmail.com
123456789123aA$
    */
    const users = await getUsers()
    return (
        <>
            <h1>Profil</h1>
            <p>{users && users || "could not fetch users"}</p>
        </>
    )
}

// 