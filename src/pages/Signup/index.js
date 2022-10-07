import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import formHead from "../../assets/03 - QuizPlantas.png";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    age: "",
    region: "",
    country: "",
    city: "",
    residence: "",
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
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(img);
    setPreview(objectURL);

    /*     const objectURL = URL.createObjectURL(img)
  setPreview(objectURL)
*/
    return () => URL.revokeObjectURL(objectURL);
  }, [img]);

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
    <div style={{ backgroundColor: "#EDDDD6" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <h1 className="formTitle">Inscreva-se</h1>
        <img src={formHead} className="formHead" alt="form" />
      </div>

      <form id="inscreverForm" onSubmit={handleSubmit}>
        <label htmlFor="formName">Nome: *</label>
        <input
          id="inscreverInfo"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />

        <label htmlFor="formEmail">E-mail: *</label>
        <input
          id="inscreverInfo"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="formPassword">Senha: *</label>
        <input
          id="inscreverInfo"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <label htmlFor="formConfirmPassword">Confirmação de senha: *</label>
        <input
          id="inscreverInfo"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="formImg">Foto de perfil:</label>
        <input
          id="formImg"
          nam="profileImage"
          type="file"
          onChange={handleImage}
        />
        {img && <img style={{ maxHeight: "260px" }} src={preview} alt="" />}

        <label htmlFor="formAge">Idade:</label>
        <input
          id="inscreverInfo"
          name="age"
          type="text"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="formCountry">País: *</label>
        <input
          id="inscreverInfo"
          name="country"
          type="text"
          value={form.country}
          onChange={handleChange}
        />

        <label htmlFor="formCity">Cidade: *</label>
        <input
          id="inscreverInfo"
          name="city"
          type="text"
          value={form.city}
          onChange={handleChange}
        />

        <label id="label" htmlFor="formResidence">
          Residência: *
        </label>
        <select
          required
          id="formSelect"
          name="residence"
          onChange={handleChange}
          defaultValue={form.residence}
        >
          <option value=""></option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Sítio">Sítio</option>
          <option value="Studio">Studio</option>
          <option value="Escritório">Escritório</option>
          <option value="Outro">Outro</option>
        </select>

        <button id="btnCadastrar" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Signup;
