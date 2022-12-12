import { getEnv } from './getEnv';
import { ListDatabasesResult, MongoClient } from 'mongodb';
export default class DataBase {
  url: string;
  userName: string;
  password: string;
  uri?: string;
  cluster: string;
  client: MongoClient;
  databases: ListDatabasesResult;

  constructor() {
    const env = getEnv();
    this.url = env.dbUrl;
    this.userName = env.dbUser;
    this.password = env.dbPassword;
    this.cluster = env.dbCluster;
  }

  async connectToDb() {
    if (this.url === null)
      return;
    this.uri = this.url.replace('aaa', this.userName);
    this.uri = this.uri.replace('bbb', this.password);
    this.uri = this.uri.replace('ccc', this.cluster) +
      '?retryWrites=true&w=majority';
    this.client = new MongoClient(this.uri);
    try {
      console.log('Connecting to database...');
      await this.client.connect();
      console.log('Connected to database');
      await this.listDatabases();
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally');
      await this.client.close();
    }
  }

  async  listDatabases() {
    this.databases = await this.client.db()
      .admin()
      .listDatabases();
    console.log('Databases:');
    this.databases.databases.forEach(db => console.log(` - ${db.name}`));
  }
}
