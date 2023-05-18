import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "./listaProdutos.css";

const ListaProdutos = ({ produtos, setProdutos, setOnEdit }) => {
  const handleedit = (produto) => {
    setOnEdit(produto);
  };

  const handledelete = async (id) => {
    await axios
      .delete("http://localhost:5000/" + id)
      .then(({ data }) => {
        const novaLista = produtos.filter((produto) => produto.id !== id);

        setProdutos(novaLista);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const getQuantidadeBadgeClass = (quantidade) => {
    if (quantidade <= 10) {
      return "red";
    } else if (quantidade > 10 && quantidade <= 30) {
      return "orange";
    } else {
      return "green";
    }
  };

  const getQuantidadeBadge = (quantidade) => {
    if (quantidade <= 10) {
      return "Crítico";
    } else if (quantidade > 10 && quantidade <= 30) {
      return "Alerta";
    } else {
      return "OK";
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.id}</td>
            <td>{produto.nome_produto}</td>
            <td>{produto.preco}</td>
            <td>{produto.quantidade}</td>
            <td
              className="badge"
              style={{ color: getQuantidadeBadgeClass(produto.quantidade) }}
            >
              {getQuantidadeBadge(produto.quantidade)}
            </td>
            <td className="actions">
              <div className="action-icons">
                <FaEdit onClick={() => handleedit(produto)} />
                <FaTrash onClick={() => handledelete(produto.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaProdutos;
