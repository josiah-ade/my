export  interface Contact {
    contactName: string;
    contactEmail: string;
    contactPhoneNumber: string;
  }
  
 export interface IContactList {
    contacts: Contact[];
    broadcastListId: string;
  }

  