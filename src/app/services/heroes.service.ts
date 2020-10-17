import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroes-75029.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel): any {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(map(
      (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      }
    ));
  }

  actualizarHeroe(heroe: HeroeModel): any {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string): Observable<any> {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(): Observable<any> {
    return this.http.get(`${this.url}/heroes.json`).pipe(map (this.heroesToArray));
  }

  getHeroe(id: string): Observable<any> {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  private heroesToArray(heroes: object): any {
    const arrHeroes: HeroeModel[] = [];
    if (heroes === null) {
      return [];
    } else {
      Object.keys(heroes).forEach(key => {
        const heroe: HeroeModel = heroes[key];
        heroe.id = key;
        heroe.nombre = heroes[key]['nombre'];
        heroe.poder = heroes[key]['poder'];
        heroe.vivo = heroes[key]['vivo'];
        arrHeroes.push(heroe);
      });
      return arrHeroes;
    }
  }

}
