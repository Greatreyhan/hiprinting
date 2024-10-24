import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { BiSave } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const custom_config = {
  extraPlugins: [MyCustomUploadAdapterPlugin],
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

class MyUploadAdapter {
  // The File Loader
  constructor(loader) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const storageRef = ref(FIREBASE_STORE, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
                100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  reject(" User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  reject("User canceled the upload");
                  break;

                case "storage/unknown":
                  reject(
                    "Unknown error occurred, inspect error.serverResponse"
                  );
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                resolve({
                  default: downloadURL,
                });
              });
            }
          );
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

function EditorAdmin() {
  const navi = useNavigate();
  const { id } = useParams();
  const [dataEdit, setDataEdit] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [tag, setTag] = useState("");
  const [descArt, setDescArt] = useState("");
  const [imgArt, setImgArt] = useState("");
  const [articleHTML, setArticleHTML] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    onValue(rtdbref(FIREBASE_DB, "data/" + id), (snapshot) => {
      const data = snapshot.val();
      setArticleHTML(data.article);
      setDataEdit(data);
      setTitle(data.title);
      setSubTitle(data.subtitle);
      setTag(data.tag);
      setDescArt(data.desc);
    });
  }, []);

  const handlerCKEDITOR = (event, editor) => {
    const data = editor.getData();
    setDataEdit(data);
  };

  const handleSendData = (e) => {
    e.preventDefault();
    if (imgArt == "") {
      console.log("Image can't be empty!");
    } else {
      setIsUpload(true);

      // Construct the database reference for the location where you want to write the data
      const dbRef = rtdbref(FIREBASE_DB, "data/" + id);

      // Create an object containing the data you want to write
      const newData = {
        title,
        subtitle,
        tag,
        article: dataEdit,
        desc: descArt,
        image: imgArt,
      };

      // Use the set method to write the data to the specified location
      set(dbRef, newData)
        .then(() => {
          // Data sent successfully
          setIsUpload(false); // Set loading to false
          navi("/blog");
        })
        .catch((error) => {
          // Handle error
          console.error("Error sending data to Firebase:", error);
          setIsUpload(false); // Set loading to false
        });
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(FIREBASE_STORE, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImgArt(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="App overflow-x-hidden">
      <div className="pt-16">
      {isUpload ? (
          <div className="w-full h-full fixed bg-black bg-opacity-50 z-50 top-0 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : null}
        <form className="w-10/12 mx-auto my-8 flex justify-around items-center">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label className="mt-4 text-xs my-2" htmlFor="title">
                Judul
              </label>
              <input
                className="px-2 py-1 border-b-2 border-blue-950 w-80"
                required
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                width={90}
                name="title"
                id="title"
                type="text"
                placeholder="Judul Artikel"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-4 text-xs my-2" htmlFor="subtitle">
                Sub-judul
              </label>
              <input
                className="px-2 py-1 border-b-2 border-blue-950 w-80"
                required
                value={subtitle}
                onChange={(e) => setSubTitle(e.currentTarget.value)}
                width={90}
                name="subtitle"
                id="subtitle"
                type="text"
                placeholder="Sub-Judul Artikel"
              />
            </div>
            <div className="flex flex-col">
              <label className="mt-4 text-xs my-2" htmlFor="tag">
                Tag
              </label>
              <input
                className="px-2 py-1 border-b-2 border-blue-950 w-80"
                required
                value={tag}
                onChange={(e) => setTag(e.currentTarget.value)}
                name="tag"
                id="tag"
                type="text"
                placeholder="Tag Artikel"
              />
            </div>
          </div>
          <div className="flex-col flex">
            <div className="flex flex-col">
              <label className="mt-4 text-xs my-2" htmlFor="desc">
                Desc
              </label>
              <textarea
                className="px-2 py-1 border-b-2 border-blue-950 w-80"
                maxLength={200}
                required
                value={descArt}
                onChange={(e) => setDescArt(e.currentTarget.value)}
                name="descArt"
                id="descArt"
                type="text"
                placeholder="Desc Artikel"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xs my-2" htmlFor="art-image">
                Gambar
              </label>
              <input
                required
                onChange={handleUpload}
                name="artImage"
                id="art-image"
                type="file"
              />
            </div>
            <button
              onClick={handleSendData}
              className="mt-4 px-6 py-2 flex justify-center items-center bg-blue-900 text-white font-semibold"
            >
              <BiSave className="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={custom_config}
        data={articleHTML}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => handlerCKEDITOR(event, editor)}
      />
    </div>
  );
}

export default EditorAdmin;
