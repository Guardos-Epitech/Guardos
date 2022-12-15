import { Request } from 'express';
import MapController from '../controllers/mapController';

export const geocoding = (req: Request) => {
  const mapGeocoding = new MapController();
  if (req.body.address !== undefined) {
    console.log("found address");
    return mapGeocoding.forwardGeocoding(req.body.address);
  }
  return 'No address given.';
};