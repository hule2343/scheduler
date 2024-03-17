import axios from "axios"

export default function AdminAddSuperUser({ params }: { params: { groupId: string } }) {
    const handleSubmit = (users_id: [string]) => {
        axios.post(`admin/groups/${params.groupId}/adduser`, { "users": users_id })
            .then((res) => {}).catch((err)=>{})
    }

    return<></>
}