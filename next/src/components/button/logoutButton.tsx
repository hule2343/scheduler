"use client";
import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import React from "react";

export const LogoutButton = () => {
  return (
    <Button color="inherit" onClick={() => signOut()}>
      ログアウト
    </Button>
  );
};
