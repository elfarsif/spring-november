export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Although it's not typical to handle passwords on the client side
}
