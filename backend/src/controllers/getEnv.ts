import fs from 'fs';
import { IEnv } from '../models/envInterface';

//can be handled dynamically
export function getEnv() {
  const all = fs.readFileSync('.env','utf8');
  const env: IEnv = {};
  const lines = all.split('\n');
  env.dbUrl = lines[0];
  env.dbUrl = env.dbUrl.replace('dbUrl:','');
  env.dbUrl = env.dbUrl.replace(' "','');
  env.dbUrl = env.dbUrl.replace('"','');
  env.dbUser = lines[1];
  env.dbUser = env.dbUser.replace('dbUser:','');
  env.dbUser = env.dbUser.replace(' "','');
  env.dbUser = env.dbUser.replace('"','');
  env.dbPassword = lines[2];
  env.dbPassword = env.dbPassword.replace('dbPassword:','');
  env.dbPassword = env.dbPassword.replace(' "','');
  env.dbPassword = env.dbPassword.replace('"','');
  return env;
}
