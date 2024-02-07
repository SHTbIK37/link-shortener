export type TAccountProps = {
  username: string;
  token: string;
};
export type TRows = {
  shortLink: string;
  fullLink: string;
  counter: number;
}[];
export type TResponseLinks = {
  id: number;
  short: string;
  target: string;
}[];
export type TSort =
  | "asc_short"
  | "asc_target"
  | "asc_counter"
  | "desc_short"
  | "desc_target"
  | "desc_counter";
