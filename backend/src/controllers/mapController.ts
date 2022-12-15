/*
    http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_KEY&query=${address}}
*/

import axios from 'axios';

// interface IGeoLocation {
//   latitude: number;
//   longitude: number;
//   type: string;
//   name: string;
//   number: string;
//   postal_code: string;
//   street: string;
//   region: string;
//   confidence: number;
//   region_code: string;
//   county: string;
//   locality: string;
//   administrative_area: string;
//   neighbourhood: string;
//   country: string;
//   country_code: string;
//   continent: string;
//   label: string;
// }

export default class MapController {
  apiUrl;
  constructor() {
    this.apiUrl = 'https://api.positionstack.com/v1/forward';
  }

  public forwardGeocoding(address: string) {
    // const result = [{} as IGeoLocation];
    const params = {
      accessKey: process.env.POSITION_STACK_KEY,
      query: address
    };
    axios.get(this.apiUrl, {params})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
