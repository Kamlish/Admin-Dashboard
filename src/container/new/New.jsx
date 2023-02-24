import React, {useState, useEffect}from 'react'

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./new.scss"

import { doc, setDoc, serverTimestamp} from "firebase/firestore"; 
import {auth, db,storage} from "../../firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const New = ({inputs, title}) => {

  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPer(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break
    }
  }, 
    (error) => {
      console.log(error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setData((pre) => ({...pre, img:downloadURL}))
      });
    }
  );
      };
      file && uploadFile();

    },[file])

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({...data, [id]: value})
  }

  const handleAdd = async(e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth,data.email,data.password)
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timestamp: serverTimestamp(),
    });
    navigate(-1)
    }catch (err) {
        console.log(err);
    } 
  }
    // Add a new document in collection "cities"

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
            <div className="formInput">
                <label htmlFor='file'> Image: <DriveFolderUploadOutlinedIcon className='icon'/></label>
                <input type="file" id='file' onChange={e=>setFile(e.target.files[0])} style={{display: "none"}} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                <label htmlFor="">{input.label}</label>
                <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
              </div>
              ))}

              {/* <div className="formInput">
                <label htmlFor="">Username</label>
                <input type="text" placeholder='kamlish_Goswami' />
              </div>
              <div className="formInput">
                <label htmlFor="">Name and Surname</label>
                <input type="text" placeholder='kamlish Goswami' />
              </div>
              <div className="formInput">
                <label htmlFor="">Email</label>
                <input type="email" placeholder='kamlish@outlook.com' />
              </div>
              <div className="formInput">
                <label htmlFor="">Phone</label>
                <input type="text" placeholder='+92 333 2922757' />
              </div>
              <div className="formInput">
                <label htmlFor="">Password</label>
                <input type="password" />
              </div>
              <div className="formInput">
                <label htmlFor="">Address</label>
                <input type="text" placeholder='3, St 4, Royal Ave, Islamabad' />
              </div>
              <div className="formInput">
                <label htmlFor="">Country</label>
                <input type="text" placeholder='Pakistan' />
              </div> */}

              <button disabled={per !== null && per <100} type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New