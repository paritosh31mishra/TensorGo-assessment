import { useState } from "react";
import swal from "sweetalert";
const Addfeedback = () => {
  let [title, picktitle] = useState("");
  let [category, pickcategory] = useState("");
  let [description, pickdescription] = useState("");
  let [rating, pickrating] = useState(0);

  const validation = () => {
    let orderstatus = true;
    // title check
    if (title == "") {
      orderstatus = false;
      document.getElementById("titleerror").innerText =
        "Please fill title field ! ";
    } else {
      document.getElementById("titleerror").innerText = "";
    }

    // categorycheck
    if (category == "") {
      orderstatus = false;
      document.getElementById("categoryerror").innerText =
        "Please fill category field ! ";
    } else {
      document.getElementById("categoryerror").innerText = "";
    }

    //description check
    if (description == "") {
      orderstatus = false;
      document.getElementById("textareaerror").innerText =
        "Please fill description field ! ";
    } else {
      document.getElementById("textareaerror").innerText = "";
    }

    if (orderstatus) save();
    // return orderstatus;
  };

  const save = () => {
    let url = "https://feedback-portal-backend-l7z5.onrender.com/savereview";
    let Author = localStorage.getItem("fullname");
    
    let newreview = {
      name: title,
      topics: category,
      description: description,
      author: Author,
      rating: rating,
    };

    let postdata = {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(newreview),
    };

    fetch(url, postdata)
      .then((responsedata) => responsedata.json())
      .then((data) => {
        console.log(data);
        swal("Review Added Successfully !!", "", "success");
        picktitle("");
        pickcategory("");
        pickdescription("");
        pickrating("");
        window.location.href = "https://feedback-portal-t6lj.onrender.com/#/";
        window.location.reload(); // reload
      });
  };

 

  return (
    <div className="container mt-5  mb-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="p-4 shadow-lg rounded">
            <div className="row">
              <h2 className="text-center">Add your feedback</h2>
              <div className="mb-3">
                <p>
                  <b>Title</b>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter the title"
                  className="form-control"
                  onChange={(obj) => picktitle(obj.target.value)}
                  value={title}
                />
                <i className="error " id="titleerror"></i>
              </div>
            </div>

            <div className="row">
              <div className="mb-3">
                <p>
                  <b>Category</b>{" "}
                </p>
                <select
                  className="form-control"
                  onChange={(obj) => pickcategory(obj.target.value)}
                  value={category}
                >
                  <option value=""> select one </option>
                  <option value="Feature">Product Features </option>
                  <option value="Pricing">Product Pricing</option>
                  <option value="Usability">Product Usability</option>
                </select>
                <i className="error " id="categoryerror"></i>
              </div>
            </div>

            <div className="row">
              <div className="mb-5">
                <p>
                  <b>Description </b>
                </p>
                <textarea
                  className="form-control"
                  placeholder="Enter your opinion"
                  rows={6}
                  value={description}
                  onChange={(obj) => pickdescription(obj.target.value)}
                ></textarea>
                <i className="error " id="textareaerror"></i>
              </div>
            </div>

            <div className="row mb-3">
              <div className="rate col-lg-8 text-center">
                <b>Product's Rating</b>
                <input
                  type="radio"
                  id="star5"
                  name="rate"
                  value="5"
                  onClick={(obj) => pickrating(obj.target.value)}
                />
                <label for="star5" title="text">
                  5 stars
                </label>
                <input
                  type="radio"
                  id="star4"
                  name="rate"
                  value="4"
                  onClick={(obj) => pickrating(obj.target.value)}
                />
                <label for="star4" title="text">
                  4 stars
                </label>
                <input
                  type="radio"
                  id="star3"
                  name="rate"
                  value="3"
                  onClick={(obj) => pickrating(obj.target.value)}
                />
                <label for="star3" title="text">
                  3 stars
                </label>
                <input
                  type="radio"
                  id="star2"
                  name="rate"
                  value="2"
                  onClick={(obj) => pickrating(obj.target.value)}
                />
                <label for="star2" title="text">
                  2 stars
                </label>
                <input
                  type="radio"
                  id="star1"
                  name="rate"
                  value="1"
                  onClick={(obj) => pickrating(obj.target.value)}
                />
                <label for="star1" title="text">
                  1 star
                </label>
              </div>

              <div className="col-lg-4"></div>
              <i className="error " id="ratingerror"></i>
            </div>

            <div className="text-center mt-3">
              {" "}
              <button
                className="btn btn-danger  m-3 text-white"
                onClick={validation}
              >
                {" "}
                submit
              </button>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Addfeedback;
