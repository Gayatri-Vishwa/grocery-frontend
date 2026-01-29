import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams(); // productId
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);

  const updateImages = async () => {
    if (files.length === 0) {
      return toast.error("Select images first");
    }

    const formData = new FormData();
    files.forEach(file => formData.append("image", file));

    try {
      const { data } = await axios.put(
        `/api/product/update-image/${id}`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Images updated successfully ✅");
      }
    } catch (err) {
      toast.error("Update failed ❌",err);
    }
  };


//     const updateProductImages = async (productId, files) => {
//   const formData = new FormData();

//   files.forEach(file => {
//     formData.append("image", file);
//   });

//   const res = await axios.put(
//     `${import.meta.env.VITE_BACKEND_URL}/api/product/update-image/${productId}`,
//     formData,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   console.log(res.data);
// };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />
      <button onClick={updateImages}>Update Images</button>
    </div>
  );
};

export default EditProduct;
