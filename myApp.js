require('dotenv').config();
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

mongoose.connect(process.env.MONGO_URI);


let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const personToSave = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["Pizza", "Pasta", "Steak"]
  });
  personToSave.save(done);
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, done);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save(done);
  })


}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOne({name: personName}, (err, person) => {
    person.age = ageToSet;
    person.save(done);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, done);

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec((err, data) => {
    (err) ? done(err) : done(null, data); 
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
