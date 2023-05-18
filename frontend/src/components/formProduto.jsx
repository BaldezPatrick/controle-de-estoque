import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./formProduto.css";
import api from "../axios/api";

const FormProduto = ({ onEdit, setOnEdit, getProdutos }) => {
  const refNome = useRef();
  const refPreco = useRef();
  const refQuantidade = useRef();

  useEffect(() => {
    if (onEdit) {
      refNome.current.value = onEdit.nome_produto;
      refPreco.current.value = onEdit.preco;
      refQuantidade.current.value = onEdit.quantidade;
    }
  }, [onEdit]);

  const handlesubmit = (e) => {
    e.preventDefault();

    const nome_produto = refNome.current.value;
    const preco = refPreco.current.value;
    const quantidade = refQuantidade.current.value;

    if (!nome_produto || !preco || !quantidade) {
      return toast.warn("É preciso preencher todos os campos.");
    }

    const formData = {
      nome_produto,
      preco,
      quantidade,
    };

    if (onEdit) {
      api
        .put("/" + onEdit.id, formData)
        .then(({ data }) => {
          toast.success(data);
          setOnEdit(null);
          getProdutos();
        })
        .catch(({ data }) => toast.error(data));
    } else {
      api
        .post("/", formData)
        .then(({ data }) => {
          toast.success(data);
          getProdutos();
        })
        .catch(({ data }) => toast.error(data));
    }

    refNome.current.value = "";
    refPreco.current.value = "";
    refQuantidade.current.value = "";
  };

  return (
    <div className="form-container">
      <form onSubmit={handlesubmit}>
        <div>
          <p>Produto</p>
          <input type="text" ref={refNome} name="nome_produto" />
        </div>
        <div>
          <p>Preço</p>
          <input
            type="number"
            min="0.01"
            step="0.01"
            ref={refPreco}
            name="preco"
          />
        </div>
        <div>
          <p>Quantidade</p>
          <input type="number" ref={refQuantidade} name="quantidade" />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormProduto;
