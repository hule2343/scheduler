'use client'
import { SlotResponse,fetcher } from "@/types/ResponseType";
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import 'react-horizontal-scrolling-menu/dist/styles.css';
import useSWR from "swr";

export default function GroupHome({ params }: { params: { groupId: string } }) {
    const { data, error, isLoading, mutate }
        = useSWR<{ slots: SlotResponse[] }>(`/${params.groupId}/slots`, fetcher);
    if (error) return <div>Loading Failed</div>;
    if (!data) return <div>loading...</div>;

    return (
        <>
            <h2>あなたのシフト</h2>
            <ScrollMenu>
                {data.slots.map((slot) => {
                    <SlotDisplayCard slot={slot} />
                })}
            </ScrollMenu>
            <h2>募集中のシフト</h2>
        </>
    );
}
