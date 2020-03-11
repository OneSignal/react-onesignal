export interface IOneSignal {
  setEmail: (email: string) => Promise<string>,
  getEmailId: () => Promise<string>,
}
