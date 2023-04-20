import {ICommunication} from './communicationInterfaces';
import {IRestaurantFrontEnd} from './restaurantInterfaces';

export interface IFilterObj {
  savedFilter: ICommunication;
  savedRestaurants: IRestaurantFrontEnd[][];
}
