import React, { useState } from 'react'
import { getFirestore, doc, setDoc} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { toast } from "react-toastify";
import {storage} from "../Configuration/firebase"
import Button from '@mui/material/Button';
import axios from 'axios';
export default function Sell() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgLink,setImgLink] = useState("");
      const [vidLink,setVidLink] = useState("");
  const [productName, setProductName] = useState('');
const [price, setPrice] = useState('');
const [category, setCategory] = useState('');
const [description, setDescription] = useState('');
const firebaseConfig = {
  apiKey: "AIzaSyBP_J7ZMICcVm2977QFPtUFYYBDBe9ApjM",
  authDomain: "e-waste-22842.firebaseapp.com",
  projectId: "e-waste-22842",
  storageBucket: "e-waste-22842.appspot.com",
  messagingSenderId: "1068202605144",
  appId: "1:1068202605144:web:586d76add8e7926f6ae82d"
};

const db = getFirestore();
const handleProductNameChange = (e) => {
  setProductName(e.target.value);
};

const handlePriceChange = (e) => {
  setPrice(e.target.value);
};

const handleCategoryChange = (e) => {
 
  setCategory(e.target.value);
};

const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleClick = async () => {
    try {
      if (image === null || video === null) {
        console.log("Please select both an image and a video.");
        return;
      }

     
      const imageRef = ref(storage, `images/${image.name}`);
      const imageUploadTask = uploadBytesResumable(imageRef, image);
      const imageSnapshot = await imageUploadTask;
      const imageUrl = await getDownloadURL(imageSnapshot.ref);
      setImgLink(imageUrl);
    
      const videoRef = ref(storage, `videos/${video.name}`);
      const videoUploadTask = uploadBytesResumable(videoRef, video);
      const videoSnapshot = await videoUploadTask;
      const videoUrl = await getDownloadURL(videoSnapshot.ref);
      setVidLink(videoUrl)
      console.log("Image URL:", imageUrl);
      console.log("Video URL:", videoUrl);

      // Reset file inputs
      setImage(null);
      setVideo(null);
      
      toast.info("Image & Video Uploaded")
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const sellProduct = async () => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('video', video);
      const product_id = "P" + Math.floor(Math.random() * 9000 + 1000);
  
      // Define the Firestore path for the document
      const firebase_path = `marketplace/${product_id}`;
  
      // Get a reference to the document
      const docRef = doc(db, firebase_path);
  
      // Set document data in Firestore
      await setDoc(docRef, {
        productName: formData.get('productName'),
        price: formData.get('price'),
        category: formData.get('category'),
        description: formData.get('description'),
        // Assuming you have already uploaded the image and video to Firebase Storage
        imgUrl: imgLink,
        modelUrl: vidLink,
        status:"available",
        id:product_id
      });
     
  
      console.log("Product added successfully to Firestore!");
      toast.success("Success !! ")
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
    }
  };
  return (
    <div className='container' style={{marginBottom:"10px"}}>
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
    <div className="flex flex-col gap-9">
      <div className=" border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Sell Product
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Product Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleProductNameChange}
                  />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handlePriceChange}
                  />
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">
                Product Category
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select onChange={handleCategoryChange} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="Television">Television</option>
                  <option value="Watch">Watch</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Furniture">Furniture</option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
                Description
              </label>
              <div>
              <textarea
              onChange={handleDescriptionChange}
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Product Image
                </label>
                <input
                  type="file"
                  accept='image/*'
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleImageChange}/>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Product Video
                </label>
                <input
                  type="file"
                  accept='video/*'
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={handleVideoChange}
                  />
              </div>




            

            <Button style={{marginRight:"3px"}} variant="contained" color="primary" onClick={() => handleClick()} >
            Upload
          </Button>
            <Button variant="contained" color="success" onClick={sellProduct}>
            Sell
          </Button>
          </div>
        </form>
      </div>
    </div>

 
  </div>
  </div>
  )
}