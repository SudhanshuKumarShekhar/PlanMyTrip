export interface UserForRegister {
  userName: string;
  email?: string;
  password: string;
  mobile?: number;
  type:string;
}

export interface UserForLogin {
  id:number;
  userName: string;
  email?: string;
  password: string;
  mobile?: number;
  type:string;
}
