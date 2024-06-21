const mongoose = require("mongoose")
const ConnectionStr = main().catch(err => console.log(err));
mongoose.set('debug', true);
async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/demo',{
  //   // useNewUrlParser: true,
  //   // useUnifiedTopology: true,
  // });

  // Live DB Connections
  const username = encodeURIComponent('israrahmedjan');
  const password = encodeURIComponent('fPpLcChybvmxExcx');
  const cluster = 'onlinestorecluster.lw6kzgv';
  const dbname = 'OnlieStoreDB'; // Specify your actual database name here
  const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=OnlineStoreCluster`;
  await mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas', err));
  // Live DB Connection End
}









module.exports = ConnectionStr;