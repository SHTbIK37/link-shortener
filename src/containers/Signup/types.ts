import { SetStateAction } from "react";
import { TUser } from "../../types";

export type TSignupProps = {
  userData: TUser;
  setUserData: React.Dispatch<SetStateAction<TUser>>;
};
