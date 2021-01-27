import { PessoaModel } from "./PessoaModel";
import { SistemaModel } from "./SistemaModel";

export interface SolicitacaoAnaliseModel {
  id?: number;
  descricao?: string;
  pessoa?: PessoaModel;
  sistema?: SistemaModel;
  statusAtual?: string;
  prazoExpectativa?: string;
  prazoExpectativaFormatada?: string;
  analiseRisco?: string;
  prioridade?: number;
}
