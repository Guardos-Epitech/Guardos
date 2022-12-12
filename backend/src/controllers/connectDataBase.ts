import { getEnv } from './getEnv';
import { ListDatabasesResult, MongoClient } from "mongodb";
export default class DataBase {
  url: string;
  userName: string;
  password: string;
  uri?: string;
  client: MongoClient;
  databases: ListDatabasesResult;

  constructor() {
    const env = getEnv();
    this.url = env.dbUrl;
    this.userName = env.dbUser;
    this.password = env.dbPassword;
  }

  async connectToDb() {
    if (this.url === null)
      return;
    this.uri = 'mongodb+srv://marc:marc@cluster0.lqgxqng.mongodb.net/test';
    this.client = new MongoClient(this.uri);
    try {
      await this.client.connect();
      await this.listDatabases();
    } catch (e) {
      console.log(e);
    } finally {
      await this.client.close();
    }
  }

  async  listDatabases(){
    this.databases = await this.client.db().admin().listDatabases();
    console.log("Databases:");
    this.databases.databases.forEach(db => console.log(` - ${db.name}`));
  };
}
