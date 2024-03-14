'use client'
import { SlotDisplayCardAssign, SlotDisplayCardEnd, SlotDisplayCardUnassign } from "@/components/card/SlotDisplayCardAssign";
import SlotListOneDay from "@/components/list/SlotListOneDay";
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import 'react-horizontal-scrolling-menu/dist/styles.css';

export default function GroupHome({ params }: { params: { groupId: string } }) {
    /*        
        const { data, error, isLoading, mutate }
            = useSWR<{ slots: SlotResponse[] }>(`/${params.groupId}/slots`, fetcher);
        const session = useSession();
        if (error) return <div>Loading Failed</div>;
        if (!data) return <div>loading...</div>;
        if (isLoading) return <div>loading...</div>;
    */

    const data = {
        slots: [
            {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [

                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-06T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-01T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-02T00:00:00Z",
                end_time: "2022-01-01T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-02T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-02T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-02T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-02T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-07T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-06T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            }, {
                id: "1",
                name: "test",
                start_time: "2022-01-03T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-05T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },

        ]
    }

    const session = {
        data: {
            id: "1"
        }
    }

    const days = Array.from(new Set(data.slots.map((slot) => new Date(slot.start_time)
        .toLocaleDateString("ja-JP", { month: "2-digit", day: "numeric" }))))
        .sort((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime())
    return (
        <>
            <h2>あなたのシフト</h2>
            <ScrollMenu>
                {data.slots.filter((slot) => ((new Date(slot.end_time)).getTime() > (new Date()).getTime())
                    && slot.assignees.map((assignee) => assignee.id).includes(session.data.id)).map((slot) =>
                        <SlotDisplayCardAssign slot={slot} />
                    )}
            </ScrollMenu>
            <h2>募集中のシフト</h2>
            <ScrollMenu >
                {days.map((day) => {
                    const slots = data.slots.filter((slot) => new Date(slot.start_time).toLocaleDateString("ja-JP", { month: "2-digit", day: "numeric" }) == day)
                        .sort((a, b) => (new Date(a.start_time)).getTime() - (new Date(b.start_time)).getTime())
                    return <SlotListOneDay day={day}>
                        {slots.map((slot) =>
                            slot.assignees.map((assignee) => assignee.id).includes(session.data.id) ?
                                <SlotDisplayCardAssign slot={slot} /> :
                                <SlotDisplayCardUnassign slot={slot} />
                        )}
                    </SlotListOneDay>
                })}
            </ScrollMenu>
            <h2>終了したシフト</h2>
            <ScrollMenu>
                {data.slots.filter((slot) => ((new Date(slot.end_time)).getTime() < (new Date()).getTime())
                    && slot.assignees.map((assignee) => assignee.id).includes(session.data.id))
                    .sort((a, b) => (new Date(a.start_time)).getTime() - (new Date(b.start_time)).getTime())
                    .map((slot) =>
                        <SlotDisplayCardEnd slot={slot} />
                    )}
            </ScrollMenu>
        </>
    );
}
