import type { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            id: number;
            name: string;
            email: string;
        };
    }
}