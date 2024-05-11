import { useParams, usePathname } from "next/navigation"
import { SlotResponse } from "@/types/ResponseType"
import * as React from 'react';
import { SlotDisplayCardBase } from "./SlotDisplayCardBase";
import Link from "next/link";
import { Button } from "@mui/material";
import axios from "@/axios";
import CheckIcon from '@mui/icons-material/Check';
export const SlotDisplayCardAssign = ({ slot }: { slot: SlotResponse }) => {
    const path = usePathname()
    return (
        <SlotDisplayCardBase slot={slot} ><Link href={path + '/slot/' + slot.id}>詳細</Link></SlotDisplayCardBase>
    )
}

export const SlotDisplayCardUnassign = ({ slot }: { slot: SlotResponse }) => {
    const path = usePathname()
    const groupId = useParams().groupId
    const [isAssigned, setAssigned] = React.useState(false)
    const assignSlot = () => {
        axios.post(`/${groupId}/slots/${slot.id}/assign`).then((res) => {
            setAssigned(true)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <SlotDisplayCardBase slot={slot} ><Link href={path + '/slots/' + slot.id}>詳細</Link>
            {isAssigned ? <CheckIcon /> : <Button size='small' onClick={assignSlot}>参加する</Button>}
        </SlotDisplayCardBase>
    )
}

export const SlotDisplayCardEnd = ({ slot }: { slot: SlotResponse }) => {
    const groupId = useParams().groupId
    const [isCompleted, setCompleted] = React.useState(false)
    const completeSlot = (done: boolean) => {
        axios.post(`/${groupId}/slots/${slot.id}/complete`, { params: { done: done } }).then((res) => {
            setCompleted(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <SlotDisplayCardBase slot={slot}>
            {isCompleted ? <CheckIcon /> :
                <><Button size='small' onClick={() => completeSlot(true)}>仕事しました</Button>
                    <Button size='small' onClick={() => completeSlot(false)}>しませんでした</Button></>}
        </SlotDisplayCardBase>
    )
}