//Communication object for BE and FE
//This is the object that is sent to the backend from the frontend
export interface ICommunication {
  range?: number;
  rating?: number[]; //2 float rating lowest and highest
  name?: string;
  location?: string;
  categories?: string[];
  allergenList?: string[];
}

