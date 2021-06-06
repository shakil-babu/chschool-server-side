
//initialize express
const express = require('express')
const app = express()

// initialize mongodb
const MongoClient = require('mongodb').MongoClient;

// mongoObjectId
const ObjectId = require('mongodb').ObjectId;

// initialize cors
var cors = require('cors');
app.use(cors());

// initialize env
require('dotenv').config()
const port = 5000

// for body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// mongodb driver code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1hyz0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client connection
client.connect(err => {
  console.log(err);
  const Smcollection = client.db(`${process.env.DB_NAME}`).collection(`specialMsg`);
  const photosAndTitleCollection = client.db(`${process.env.DB_NAME}`).collection(`photosAndTitle`);
  const studentsCollection = client.db(`${process.env.DB_NAME}`).collection(`students`);
  const teachersCollection = client.db(`${process.env.DB_NAME}`).collection(`teachers`);
  const aboutSchoolCollection = client.db(`${process.env.DB_NAME}`).collection(`aboutSchool`);
  const qaCollection = client.db(`${process.env.DB_NAME}`).collection(`questionsAndAnsweres`);


/* =========================================================================================================
=====================================================================================
======================================================
========================= For Special Message */


// ============ insert specail message to database ==================
app.post('/addSpecialMsg', (req, res) => {
  const specialMsg = req.body ;
  console.log(specialMsg);
  Smcollection.insertOne(specialMsg)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})


// ============== read specail message from database ========================
app.get('/readSpecialMsg', (req, res) => {
  Smcollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})


// ======================== read specific sm =================
app.get('/readSpecialMsg/:id', (req,res) => {
  const id = req.params.id;
  Smcollection.find({_id:ObjectId(id)})
  .toArray((error, documents) => {
    res.send(documents[0]);
  })
})

  // =============== update sm item =====================
  app.patch('/updateSingleSMmsg/:id' , (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    Smcollection.updateOne({_id:ObjectId(id)},{
      $set: {specialMsg:req.body.specialMsg}
    })
    .then((result) => {
      res.send(result.modifiedCount > 0)
      console.log(result);
      res.redirect('/');
    })

})



/* =========================================================================================================
=====================================================================================
======================================================
========================= For Photos and title */


// insert photosAndTitle data
app.post('/addPhotosAndTitle', (req, res) => {
  const pt = req.body ;
  console.log(pt);
  photosAndTitleCollection.insertOne(pt)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})


// ============== read photosAndTitle data from database ========================
app.get('/readPhotosAndTitle', (req, res) => {
  photosAndTitleCollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})




// =============== delete PhotosAndItems data ==================

app.delete('/photosAndItemsdelete/:id', (req, res) => {
  photosAndTitleCollection.deleteOne({_id:ObjectId(req.params.id)})
  .then(result => {
      res.send(result.deletedCount > 0)
  })
}) 



/* =========================================================================================================
=====================================================================================
======================================================
========================= For about School */


// ============ insert school info to database ==================
app.post('/addAboutSchool', (req, res) => {
  const schoolInfo = req.body ;
  aboutSchoolCollection.insertOne(schoolInfo)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})


// ============== read school info from database ========================
app.get('/readAboutSchool', (req, res) => {
  aboutSchoolCollection.find({})
  .toArray((error, documents) => {
      res.send(documents)
  })
})


// ======================== read specific info =================
app.get('/readSchoolInfo/:id', (req,res) => {
  const id = req.params.id;
  aboutSchoolCollection.find({_id:ObjectId(id)})
  .toArray((error, documents) => {
    res.send(documents[0]);
  })
})

  // =============== update school info item =====================
  app.patch('/updateSingleSchoolInfo/:id' , (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    aboutSchoolCollection.updateOne({_id:ObjectId(id)},{
      $set: {message:req.body.message}
    })
    .then((result) => {
      res.send(result.modifiedCount > 0)
      console.log(result);
      res.redirect('/');
    })

})



/* =========================================================================================================
=====================================================================================
======================================================
========================= for add students info */


// insert student info 
app.post('/addStudentsInfo', (req, res) => {
  const si= req.body ;
  console.log(si);
  studentsCollection.insertOne(si)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})



// ================  read studnets info ==================
app.get('/readStudents', (req, res) => {
  const search = req.query.search ;
  studentsCollection.find({name: {$regex:search}})
  .toArray((error, documents) => {
      res.send(documents)
  })
})

// ================ delete student info ================
app.delete('/studentInfoDelete/:id', (req, res) => {
  studentsCollection.deleteOne({_id:ObjectId(req.params.id)})
  .then(result => {
      res.send(result.deletedCount > 0)
  })
}) 








/* =========================================================================================================
=====================================================================================
======================================================
========================= for add teachers info */


// insert student info 
app.post('/addTeachersInfo', (req, res) => {
  const ti= req.body ;
  console.log(ti);
  teachersCollection.insertOne(ti)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})














/* =========================================================================================================
=====================================================================================
======================================================
========================= add questions and answeres info */


// insert student info 
app.post('/addQuestionAndAnswere', (req, res) => {
  const qa= req.body ;
  console.log(qa);
  qaCollection.insertOne(qa)
  .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
  })
})







});







// listen port
app.listen(port, () => {
    console.log("5000 port is opening...")
})