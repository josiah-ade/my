export interface IPlanProps{
    title:string,
    amount:string,
    description: string[];
}

export interface ISubScription {
    date?: string;
    package?: string;
    duration?: string;
    expiry?: string;
    price?: string;
    status?: string;
  }