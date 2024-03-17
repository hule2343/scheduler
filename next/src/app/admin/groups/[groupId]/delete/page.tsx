'use client'
import DeleteConfirmForm from "@/components/form/DeleteConfirmForm";
import axios from "axios";

export default function GroupDeleteForm({ params }: { params: { groupId: string } }) {
    const handleGroupDelete = () => {
        axios.delete(`admin/groups/${params.groupId}`).then(
            (res) => { }).catch((err) => { })
    }
    return <DeleteConfirmForm onSubmit={handleGroupDelete} redirect={`/admin/groups`} />
}