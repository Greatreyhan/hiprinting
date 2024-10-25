import { useParams, useNavigate, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSave } from "react-icons/bi";


const ProductEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataEdit, setDataEdit] = useState("");
    const [title, setTitle] = useState("");
    const [trademark, setTrademark] = useState("");
    const [linkProduct,setLinkProduct] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [isUpload, setIsUpload] = useState(false);

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

    const handleSendData = (e) => {
        e.preventDefault();
        if (img == "") {
            console.log("Image can't be empty!");
        } else {
            setIsUpload(true);

            // Construct the database reference for the location where you want to write the data
            const timestamp = Date.now();
            const dbRef = rtdbref(FIREBASE_DB, "product/" + (id ? id : timestamp));

            // Create an object containing the data you want to write
            const newData = {
                title,
                trademark,
                link:linkProduct,
                content: dataEdit,
                desc: description,
                img: img,
            };

            // Use the set method to write the data to the specified location
            set(dbRef, newData)
                .then(() => {
                    // Data sent successfully
                    setIsUpload(false); // Set loading to false
                    navigate("/admin/product");
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
                        setImg(downloadURL);
                    });
                }
            );
        }
    };

    useEffect(() => {
        if (id) {
            onValue(rtdbref(FIREBASE_DB, "product/" + id), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    
                    setDataEdit(data);
                    setTitle(data.title);
                    setTrademark(data.trademark);
                    setDescription(data.desc);
                    setLinkProduct(data.link)
                    setImg(data.img)
                }
            });
        }
    }, []);


    return (
        <div className="App overflow-x-hidden">
            <div className="pt-16">
                {isUpload ? (
                    <div className="w-full h-full fixed bg-black bg-opacity-50 z-50 top-0 flex justify-center items-center">
                        <div className="loader"></div>
                    </div>
                ) : null}
                <form className="w-10/12 flex flex-col mx-auto my-8 justify-around items-center">
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="title">
                            Judul
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            width={90}
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Judul Produk"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="trademark">
                            Merek
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            required
                            value={trademark}
                            onChange={(e) => setTrademark(e.currentTarget.value)}
                            name="trademark"
                            id="trademark"
                            type="text"
                            placeholder="Merek Produk"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="trademark">
                            Link
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            required
                            value={linkProduct}
                            onChange={(e) => setLinkProduct(e.currentTarget.value)}
                            name="link"
                            id="link"
                            type="text"
                            placeholder="Link Produk"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="desc">
                            Desc
                        </label>
                        <textarea
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            maxLength={200}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Desc Produk"
                        ></textarea>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-xs my-2" htmlFor="art-image">
                            Gambar
                        </label>
                        <div className="flex items-center gap-x-5">
                        { img && <a href={img} target="_blank"><img className="w-16 h-16" src={img} /></a>}
                        <input
                            required
                            onChange={handleUpload}
                            name="Image"
                            id="image"
                            type="file"
                        />
                        </div>
                    </div>

                    <div className="flex w-full justify-end items-center gap-x-5">
                        <Link className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-white text-sky-900 border border-sky-800 rounded-full font-semibold" to="/admin/Produk">Kembali</Link>
                        <button
                            onClick={handleSendData}
                            className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-sky-900 rounded-full text-white font-semibold"
                        >
                            <BiSave className="mr-2" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEditor