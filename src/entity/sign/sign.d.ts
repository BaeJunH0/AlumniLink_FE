export type T_SignUp = {
  email: string;
  nickname: string;
  password: string;
  employed: boolean;
  gitLink?: string;
  resumeLink?: string;
};

export type T_Login = {
  email: string;
  nickname?: string;
  password: string;
  employed?: boolean;
  gitLink?: string;
  resumeLink?: string;
};
