import { NaturezaModel } from './../NaturezaModel';
import { GrupoModel } from './GrupoModel';
import { ArtigoModel } from './ArtigoModel';

export interface InfracaoModel {
  id?: number;
  codigo?: string;
  descricao?: string;
  amparoLegal?: string;
  medidaAdm?: string;
  crime?: boolean;
  obsObrigatoria?: boolean;
  artigo?: ArtigoModel;
  grupo?: GrupoModel;
  natureza?: NaturezaModel;
  competenciaMunicipal?: boolean;
  competenciaEstadual?: boolean;
  competenciaRodoviaria?: boolean;
  podeApresentarCondutorInfrator?: boolean;
  validadeInicio?: Date;
  validadeFim?: Date;
  validadeInicioFormatada?: string;
}
