import { Personajes } from './Personajes';
import { info } from './info';

export interface PersonajesResponse {
  info: info;
  results: Personajes[];
}
