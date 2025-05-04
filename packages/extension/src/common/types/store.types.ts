export interface Store{
  isAuthenticated: boolean
  username: string
  token: string
  hosts: {[host: string]: number}
}