import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = true;

  constructor(private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe(respuesta => {
      if (respuesta.length > 0) {
        this.heroes = respuesta;
      }
      setTimeout(() => {
        this.cargando = false;
      }, 1500);
    });
  }

  borrarHeroe(id: string, index: number): void {
    Swal.fire({
      title: '<strong>Confirmar borrado</strong>',
      icon: 'question',
      html:
      `¿Estás seguro de que deseas borrar al heroe?`,
      showCancelButton: true,
      showConfirmButton: true
    }).then(respuesta => {
      if (respuesta.value) {
        this.heroes.splice(index, 1);
        this.heroesService.borrarHeroe(id).subscribe();
      }
    });
  }

}
