import React, { useState } from "react";

const AddBook = () => {
  const [values, setValues] = useState({
    title: "",
    page: "",
    year: "",
    price: "",
    author_id: "",
    genre_id: "",
    description: "",
  });
  const [file, setFile] = useState();
  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };
  return (
    <div>
      <h2>Add Book</h2>
      <form action="">
        <div>
          <input
            onChange={(evt) => setFile(evt.target.files[0])}
            type="file"
            name="image"
          />
        </div>
        <div>
          <input
            onChange={onChange}
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            onChange={onChange}
            type="text"
            name="page"
            placeholder="Pages"
          />
          <input
            onChange={onChange}
            type="text"
            name="year"
            placeholder="Year"
          />
          <input
            onChange={onChange}
            type="text"
            name="price"
            placeholder="Price"
          />
          <input
            onChange={onChange}
            type="text"
            name="author_id"
            placeholder="Author id"
          />
          <input
            onChange={onChange}
            type="text"
            name="genre_id"
            placeholder="Genre_id"
          />
          <input
            onChange={onChange}
            type="text"
            name="description"
            placeholder="Description"
            id=""
          />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
