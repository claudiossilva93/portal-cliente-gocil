import api from "./api";
import { setCliente } from "./auth";

export const carregarCliente = codCliente =>
{
  const uri = `dataset/search?datasetId=dsCadastroClientePortal&filterFields=codigo,${ codCliente }`;

  api
    .get( uri )
    .then( response => {

      setCliente( response.data.content[0] )

    });

}