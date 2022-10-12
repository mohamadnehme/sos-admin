import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, FormGroup, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userSlice";

const { REACT_APP_API_ENDPOINT } = process.env;

const EditNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const id = params["id"];

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.userSlice.user);

  // imageList, addUpdateIndex,
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/api/news/` + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((data) => {
        setAuthor(data.data.author);
        setTitle(data.data.title);
        setDescription(data.data.description);
        setContent(data.data.content);
        setUrl(data.data.url);
        setFileUrl(data.data.fileUrl);
        console.log(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }, [dispatch, id, navigate, user.token]);

  let valid =
    author !== "" &&
    title !== "" &&
    description !== "" &&
    content !== "" &&
    url !== "";

  const onSubmit = () => {
    if (
      author !== "" &&
      title !== "" &&
      description !== "" &&
      content !== "" &&
      url !== ""
    ) {
      setLoading(true);
      var formData = new FormData();

      formData.append("author", author);

      formData.append("title", title);

      formData.append("description", description);

      formData.append("content", content);

      formData.append("url", url);

      if (file) formData.append("file", file);

      axios
        .post(`${REACT_APP_API_ENDPOINT}/api/updateNews/` + id, formData, {
          headers: {
            Authorization: "Bearer " + user.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data);
          navigate("/news");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <h2>Edit News</h2>
      <div style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}>
        <div style={{ width: "80%", margin: "auto" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            {fileUrl !== "" && (
              <Box
                style={{ maxWidth: "500px" }}
                component="img"
                alt="The house from the offer."
                src={fileUrl}
              />
            )}
          </div>
          <br />
          <br />
          <FormGroup>
            <TextField
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Author"
              variant="outlined"
            />
            <br />
            <TextField
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Title"
              variant="outlined"
            />
            <br />
            <TextField
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              style={{ width: "100%" }}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Description"
              variant="outlined"
            />
            <br />
            <TextField
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              style={{ width: "100%" }}
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Content"
              variant="outlined"
            />
            <br />
            <TextField
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
              }}
              aria-describedby="my-helper-text"
              label="Url"
              variant="outlined"
            />
            <br />
            <br />
            <input type="file" onChange={onChange} />
            <br />
            <br />
            <Button
              disabled={!valid || loading}
              onClick={onSubmit}
              style={{
                borderRadius: 35,
                padding: "18px 36px",
                fontSize: "18px",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default EditNews;
