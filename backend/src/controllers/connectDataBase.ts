import { getEnv } from './getEnv';
const mongoose = require('mongoose');  /* eslint-disable-line */

const restaurantSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  id: Number,
  phoneNumber: String,
  dishes: [{
    name: String,
    description: String,
    price: Number,
    allergens: String,
    category: {
      menuGroup: String,
      foodGroup: String,
      extraGroup: String,
    },
  }],
  location: {
    streetName: String,
    streetNumber: String,
    postalCode: String,
    country: String,
  },
  mealType: [{
    name: String,
    id: Number,
    sortId: Number,
  }],
  extras: [{
    name: String,
    description: String,
    price: Number,
    allergens: String,
    category: {
      menuGroup: String,
      foodGroup: String,
      extraGroup: String,
    },
  }],
});

// export default class DataBase {
//   url: string;
//   userName: string;
//   password: string;
//   uri?: string;
//   cluster: string;
//   client: any;
//   databases: ListDatabasesResult;
//
//   constructor() {
//     const env = getEnv();
//     this.url = env.dbUrl;
//     this.userName = env.dbUser;
//     this.password = env.dbPassword;
//     this.cluster = env.dbCluster;
//   }
//
//   async connectToDb() {
//     if (this.userName.length === 0 || this.password.length === 0
//       || this.cluster.length === 0)
//       return;
//     this.uri = this.url.replace('aaa', this.userName);
//     this.uri = this.uri.replace('bbb', this.password);
//     this.uri = this.uri.replace('ccc', this.cluster) +
//       '?retryWrites=true&w=majority';
//     try {
//       console.log('Connecting to database... with: ' + this.uri);
//       mongoose.set('strictQuery', false);
//       mongoose.connect(this.uri,
//         {
//           useNewUrlParser: true,
//           useUnifiedTopology: true
//         });
//       this.client = mongoose.connection.getClient();
//       this.client.on('error', console.error.bind(console, 'connection error:'));
//       this.client.once('open', async function () {
//         const RestaurantSchema = mongoose.model('Restaurants',
//           restaurantSchema);
//         console.log('Connected to database');
//         console.log(RestaurantSchema);
//         const aaa = await RestaurantSchema.find({});
//         console.log(aaa);
//         for await (const doc of RestaurantSchema.find()) {
//           console.log(doc); // Prints documents one at a time
//         }
//         console.log('done with printing');
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
//
//   async  listDatabases() {
//     this.databases = await this.client.db()
//       .admin()
//       .listDatabases();
//     console.log('Databases:');
//     this.databases.databases
//       .forEach(db => console.log(` - ${db.name}`));
//   }
//
//   public getCollectionOfRestaurants() {
//
//     return this.client;
//   }
//
//   async listRestaurants() {
//     console.log('Restaurants:');
//     const collection = await this.getCollectionOfRestaurants();
//     collection.on('data', (item : IRestaurantBackEnd) => {
//       console.log(item);
//     });
//     console.log('End of restaurants');
//   }
//
//   async disconnectFromDatabase() {
//     await this.client.close();
//   }
// }

export default async function connectDataBase() {
  const env = getEnv();
  const url = env.dbUrl;
  const userName = env.dbUser;
  const password = env.dbPassword;
  const cluster = env.dbCluster;
  let uri = url.replace('aaa', userName);
  uri = uri.replace('bbb', password);
  uri = uri.replace('ccc', cluster) + '?retryWrites=true&w=majority';
  try {
    console.log('Connecting to database...');
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const client = mongoose.connection.getClient();
    await mongoose.connection.once('open', () => {
      console.log('Connected to Database');
      mongoose.connection.db.listCollections({name: 'Restaurants'})
        .next(function(err: any, name: any) {
          if (err) {
            console.log(err);
          }
          console.log(name); // [{ name: 'dbname.myCollection' }]

        });

    });
    return 1;
  } catch (e) {
    console.error(e);
    return -1;
  }
  return 1;
}

