import { NaturezaModel } from './NaturezaModel';
import { GrupoModel } from './GrupoModel';
export interface InfracaoModel {
  id?: number;
  codigo?: string;
  descricao?: string;
  amparoLegal?: string;
  medidaAdm?: string;
  crime?: boolean;
  obsObrigatoria?: boolean;

  grupoId?: number;
  grupo?: GrupoModel;
  naturezaId?: number;
  natureza?: NaturezaModel;


  competenciaMunicipal?: boolean;
  competenciaEstadual?: boolean;
  competenciaRodoviaria?: boolean;
  infratorCondutor?: boolean;
  infratorProprietario?: boolean;
  validadeInicio?: Date;
  validadeFim?: Date;
  dataAtualizacao?: Date;
}
