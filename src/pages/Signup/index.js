import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    age: "",
    region: "",
    country: "",
    city:"",
    residance: "",
  });

  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {

    if (!img) {
      setPreview(undefined)
      return
    }
    
    const objectURL = URL.createObjectURL(img)
    setPreview(objectURL)

/*     const objectURL = URL.createObjectURL(img)
  setPreview(objectURL)
*/
  return () => URL.revokeObjectURL(objectURL)
}, [img])

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/users/sign-up", { ...form, img: imgURL });

      navigate("/login");
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Seu usuário não pôde ser criado.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formName">Nome:</label>
      <input
        id="formName"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="formEmail">E-mail:</label>
      <input
        id="formEmail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="formPassword">Senha:</label>
      <input
        id="formPassword"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <label htmlFor="formConfirmPassword">Confirmação de senha</label>
      <input
        id="formConfirmPassword"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <label htmlFor="formImg">Sua foto de perfil:</label>
      <input type="file" onChange={handleImage} />
      {img && <img src={preview} alt="" />}

      <label htmlFor="formAge">Idade:</label>
      <input
        id="formAge"
        name="age"
        type="text"
        value={form.age}
        onChange={handleChange}
      />

<label htmlFor="formRegion">Região:</label>
      <input
        id="formName"
        name="name"
        type="text"
        value={form.region}
        onChange={handleChange}
      />

<label htmlFor="formCountry">País:</label>
      <input
        id="formCountry"
        name="country"
        type="text"
        value={form.country}
        onChange={handleChange}
      />

<label htmlFor="formCity">Cidade:</label>
      <input
        id="formCity"
        name="city"
        type="text"
        value={form.city}
        onChange={handleChange}
      />

      

      <button type="submit">Cadastrar</button>
    </form>
  );
}
