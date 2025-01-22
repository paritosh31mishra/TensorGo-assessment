const clientId = "bd593f74-7bf1-4155-9a04-ed2bb9afce19";
const author_idx = "follower_67dzp46j";
const CATEGORY_ALL = "all";
const CATEGORY_PRICING = "pricing";
const CATEGORY_FEATURE = "feature";
const CATEGORY_USABILITY = "usability";

//express downloading code
const express = require('express');
const app = express();

// use cross origin for frontend-backend communication
const cors = require('cors'); // calling cross origin library


const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://feedback-portal-gp5t.onrender.com" // Hosted frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true, // Include credentials (if needed)
  })
);

app.use(express.json());



app.get("/getreviews", function (req, res) {
  const category = req.query.category;
  fetch("https://api.frill.co/v1/ideas?sortBy=created_at&limit="+Number.MAX_SAFE_INTEGER, {
    method: "GET",
    headers: {
      Authorization: "Bearer" + clientId,
    },
  })
    .then((response) => response.json())
    .then((body) => {
      let newitem = [];
      let rating = "";
      let newdescription = "";
      let topic = "";

      body.data.map((item, index) => {
        rating = item.description.slice(item.description.length - 1);
        newdescription = item.description.slice(0, item.description.length - 9);
        item.topics.map((element, i) => {
          topic = element.name;
        });
        if (category != CATEGORY_ALL) {
          if (topic == category) {
            newitem.push({
              name: item.name,
              topics: topic,
              description: newdescription,
              author: item.author.name,
              rating: rating,
            });
          }
        } else {
          newitem.push({
            name: item.name,
            topics: topic,
            description: newdescription,
            author: item.author.name,
            rating: rating,
          });
        }
      });
     
      let jsonData = JSON.stringify(newitem);
      res.status(200);
      res.send(jsonData);
      res.end();
    });

});

app.post("/savereview", (req, res) => {
 
  let rate = req.body.rating;
  let newdes = req.body.description + " rating:" + rate;
  let topic = req.body.topics;
  let topic_idx = "";
  // calling topic api for getting topic_idx
  fetch("https://api.frill.co/v1/topics", {
    method: "GET",
    headers: {
      Authorization: "Bearer" + clientId,
    },
  })
    .then((response) => response.json())
    .then((body) => {
      for (let i = 0; i < body.data.length; i++) {
        if (body.data[i].name == topic) {
          topic_idx = body.data[i].idx;
          break;
        }
      }

      
      let newreview = {
        name: req.body.name,
        description: newdes,
        author_idx: author_idx,
        topic_idxs: [topic_idx],
      };

      let url = "https://api.frill.co/v1/ideas";
      let postdata = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer bd593f74-7bf1-4155-9a04-ed2bb9afce19",
        },
        method: "POST",
        body: JSON.stringify(newreview),
      };
     
      fetch(url, postdata)
        .then((responsedata) => responsedata.json())
        .then((data) => {
          res.status(200);
          res.send(data);

          
        });
    });

});

app.listen(5556, function () {
  console.log("Server is started... on 5556 port number");
});
