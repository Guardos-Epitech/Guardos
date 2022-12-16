import { Request } from 'express';
import MapController from '../controllers/mapController';
import { IGeoLocation } from '../models/mapInterfaces';

export const geocoding = async (req: Request) => {
  const mapGeocoding = new MapController();
  if (req.body.address !== undefined) {
    const result: IGeoLocation = 
    await mapGeocoding.awaitForwardGeocoding(req.body.address);
    console.log('mapGeocoding result: ' + result);
    return result;
  }
  return 'No address given.';
};
