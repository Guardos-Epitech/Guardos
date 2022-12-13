import { getEnv } from './getEnv';
import { ListDatabasesResult, MongoClient } from 'mongodb';
import { IRestaurantBackEnd } from '../models/restaurantInterfaces';
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
    if (this.userName.length == 0 || this.password.length === 0
      || this.cluster.length === 0)
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
    } catch (e) {
      console.log(e);
    }
  }

  async  listDatabases() {
    this.databases = await this.client.db()
      .admin()
      .listDatabases();
    console.log('Databases:');
    this.databases.databases
      .forEach(db => console.log(` - ${db.name}`));
  }

  getCollection() {
    return this.client.db('Guardos')
      .collection('Restaurants')
      .find()
      .stream();
  }

  async listRestaurants() {
    const collection = await this.getCollection();
    collection.on('data', (item : IRestaurantBackEnd) => {
      console.log(item);
    });
  }

  async disconnectFromDatabase() {
    await this.client.close();
  }
}
