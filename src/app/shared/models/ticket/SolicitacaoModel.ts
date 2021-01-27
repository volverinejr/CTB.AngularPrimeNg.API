import { PessoaModel } from "./PessoaModel";
import { SistemaModel } from "./SistemaModel";

export interface SolicitacaoModel {
  id?: number;
  descricao?: string;
  pessoa?: PessoaModel;
  sistema?: SistemaModel;
  statusAtual?: string;
}
