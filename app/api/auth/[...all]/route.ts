import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";





//Email Vaildation


//Rate Limit

const authHandlers = toNextJsHandler(auth.handler)

