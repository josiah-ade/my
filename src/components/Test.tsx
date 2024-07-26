import { useAuthContext } from "@/providers/context/auth";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import useGoogleAuthState from "@/providers/stores/googleAuthStore";
import { useEffect, useRef, useState } from "react";
import Button from "./button/button";

declare global {
  interface Window {
    gapi: any;
  }
}

export default function GoogleSignIn() {
  
}
