require('dotenv').config();
const app = require('./app');

const mongoose = require('mongoose');
const PORT = process.env.PORT;
const url = process.env.URL;

async function start() {
  try {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, (err) => {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log(
          `[SERVER]: Server is running on http://localhost:${PORT}`,
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}

start();
