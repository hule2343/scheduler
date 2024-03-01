import { GroupResponse } from "@/types/ResponseType";
import { Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios, { AxiosResponse } from "axios";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
const fetcher = <T,>(path: string): Promise<T> => axios.get("http://localhost:8080" + path).then((res: AxiosResponse<T>) => res.data)


const Groups = () => {
    const { data, error, isLoading } = useSWR<{ groups: GroupResponse[] }>("/groups", fetcher);
    const router = useRouter()
    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading...</div>;

    const joined_groups = data?.groups.filter((group) => group.role == 'normal' || group.role == 'super')
    const pending_groups = data?.groups.filter((group) => group.role == 'pending')
    const irrelevant_groups = data?.groups.filter((group) => group.role == null)
    const applyParticipate = (group_id: string) => {

    }
    return <>
        <Container>
            <List>
                {joined_groups?.map((group) =>
                    <ListItem><ListItemText primary={group.name} />
                        <ListItemButton onClick={() => router.push(`/${group.id}`)}>
                            <ArrowForwardIcon />
                        </ListItemButton></ListItem>)}
            </List>
        </Container>
        <Container>
            <List>
                {pending_groups?.map((group) =>
                    <ListItem><ListItemText primary={group.name} /></ListItem>)}
            </List>
        </Container>
        <Container>
            <List>
                {irrelevant_groups?.map((group) =>
                    <ListItem><ListItemText primary={group.name} />
                        <ListItemButton onClick={() => applyParticipate(group.id)}>
                            <GroupAddIcon/>,
                        </ListItemButton></ListItem>)}
            </List>
        </Container>
    </>
}