import { Image } from './image';

export interface Disease {
  id?: number;
  nom?: string;
  nomScientifique?: string;
  cycleImage?: string;
  nomClasse?: string;
  management?: string;
  conditions?: string;
  symptoms?: string;
  control?: string;
  langue?: string;
  images?: Image[];
}
