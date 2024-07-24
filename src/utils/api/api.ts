import { data } from './dummy-data';

export class Api {
  static async getMenus() {
    return data;
  }
}
