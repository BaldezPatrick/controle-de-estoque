import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormProduto from "./components/formProduto";
import ListaProdutos from "./components/listaProdutos";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:5000");
      setProdutos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <main>
      <ToastContainer autoClose={2000} position={toast.POSITION.TOP_RIGHT} />
      <h1>Controle de Estoque</h1>
      <FormProduto
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getProdutos={getProdutos}
      />
      <ListaProdutos
        produtos={produtos}
        setProdutos={setProdutos}
        setOnEdit={setOnEdit}
      />
    </main>
  );
}

export default App;
