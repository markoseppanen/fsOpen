const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://marko:${password}@cluster0.pld0rxt.mongodb.net/testBook?retryWrites=true&w=majority`;
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// If given arguments in addition save data to mongo
if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  mongoose
    .connect(url)
    .then(_result => {
      const person = new Person({
        name: name,
        number: number,
      });
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      return person.save();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch(err => console.log(err));
}

if (process.argv.length === 3) {
  console.log('Phonebook:');
  mongoose.connect(url).then(
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person.name, person.number);
      });
      return mongoose.connection.close();
    })
  );
}
