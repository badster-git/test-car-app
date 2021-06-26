const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string

const url =
  "mongodb+srv://testuser:Password123@cluster0.zcttd.mongodb.net/car_trader_app?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "car_trader_app";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    // Use the collection "people"
    const col = db.collection("frequentlyAskedQuestions");
    // Construct a document
    let faqDocuments = [
      {
        question: "How to be safe buying online?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
      {
        question: "Do I have any assurance on my new car?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
      {
        question: "How many kilometers a normal car can have?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
      {
        question: "What is the best month to buy a car?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
      {
        question: "How to know the car history?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
      {
        question: "How much do I pay a month to use the service?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        createDate: new Date(2021, 6, 20),
      },
    ];
    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertMany(faqDocuments);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
