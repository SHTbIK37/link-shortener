import type { SetStateAction } from "react";
import type { TUser } from "../../types"

export type TSigninProps={
    userData:TUser
    setUserData: React.Dispatch<SetStateAction<TUser>>;
    setToken:React.Dispatch<SetStateAction<string>>
}