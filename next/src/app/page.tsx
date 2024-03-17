'use client'
import { GroupResponse } from "@/types/ResponseType";
import { Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { AxiosResponse } from "axios";
import axios from "@/axios";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import NextAuthProvider from "@/components/provider/NextAuth";
const fetcher = <T,>(path: string): Promise<T> => axios.get("http://localhost:8080" + path).then((res: AxiosResponse<T>) => res.data)


export default function Top() {
    return <NextAuthProvider><GroupList/></NextAuthProvider>
}

const GroupList = () => {
    const { data, error, isLoading, mutate } = useSWR<{ groups: GroupResponse[] }>("/groups", fetcher);
    const router = useRouter()
    if (error) router.push('api/auth/signin')
    if (isLoading) return <div>Loading...</div>;
    const joined_groups = data?.groups.filter((group) => group.role == 'normal' || group.role == 'super')
    const pending_groups = data?.groups.filter((group) => group.role == 'pending')
    const irrelevant_groups = data?.groups.filter((group) => group.role == null)
    const applyParticipate = (group_id: string) => {
        axios.post(`/${group_id}/users/join`).then((res) => {
            mutate()
        }).catch((err) => {

        })
    }

    

    return <>
        <Container>
            <List>
                {joined_groups?.map((group) =>
                    <ListItem key={group.id}><ListItemText primary={group.name} />
                        <ListItemButton >
                            <ArrowForwardIcon onClick={() => { router.push(`/${group.id}/`) }} />
                        </ListItemButton></ListItem>)}
            </List>
        </Container>
        <Container>
            <List>
                {pending_groups?.map((group) =>
                    <ListItem key={group.id}><ListItemText primary={group.name} /></ListItem>)}
            </List>
        </Container>
        <Container>
            <List>
                {irrelevant_groups?.map((group) =>
                    <ListItem key={group.id} ><ListItemText primary={group.name} />
                        <ListItemButton onClick={() => applyParticipate(group.id)}>
                            <GroupAddIcon />,
                        </ListItemButton></ListItem>)}
            </List>
        </Container>
    </>
}

