'use client'
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function DeleteConfirmForm({ redirect, onSubmit }: { redirect: string, onSubmit: () => void }) {
    return (
        <>
            <Typography component="h1" variant="h5">
                本当に削除してよろしいですか？
            </Typography>
            <Button onClick={onSubmit}>
                削除
            </Button>
            <Link href={redirect}>キャンセル</Link>
        </>
    )
}