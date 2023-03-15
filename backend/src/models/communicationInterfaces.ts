//Communication object for BE and FE
//This is the object that is sent to the backend from the frontend
export interface ICommunication {
  allergenList?: string[];
  location?: string;
  name?: string;
  rating?: number[]; //2 float rating lowest and highest
  range?: number;
  categories?: string[];
}
