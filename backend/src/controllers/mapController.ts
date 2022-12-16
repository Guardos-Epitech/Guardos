import axios from 'axios';
import dotenv from 'dotenv';
import { IGeoLocation } from '../models/mapInterfaces';

dotenv.config();

export default class MapController {
  apiUrl;
  constructor() {
    this.apiUrl = 'http://api.positionstack.com/v1/forward';
  }

  public awaitForwardGeocoding(address:string): Promise<IGeoLocation> {
    return new Promise<IGeoLocation>(function (resolve, reject) {
      let result = {} as IGeoLocation;
      const params = {
        access_key: process.env.POSITION_STACK_KEY, /* eslint-disable-line */
        query: address,
        limit: '1'
      };
      axios.get('http://api.positionstack.com/v1/forward', {params})
        .then(response => {
          const data = response.data.data[0];
          result = {latitude: data.latitude,
            longitude: data.longitude, type: data.type, name: data.name,
            region: data.region};
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }
}
