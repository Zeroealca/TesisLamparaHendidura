import type { DefaultUser } from "next-auth";
import { IMAGE } from "src/context/context";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: number;
      name: string;
      email: string;
    };
  }
}
