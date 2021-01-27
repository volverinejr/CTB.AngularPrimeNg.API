import { TimeModel } from "./TimeModel";

export interface SprintModel {
  id?: number;
  nome?: string;
  dataInicio?: string;
  dataInicioFormatada?: String;

  dataFim?: string;
  dataFimFormatada?: String;

  time?: TimeModel;
}
