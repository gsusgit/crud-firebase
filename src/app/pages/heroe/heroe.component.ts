import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe(respuesta => {
        this.heroe = respuesta;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm): void {
    if (form.valid) {
      Swal.fire(
        'Espere',
        'Guardando información',
        'info'
      );
      Swal.showLoading();
      let peticion: Observable<any>;
      if (this.heroe.id) {
        peticion = this.heroesService.actualizarHeroe(this.heroe);
      } else {
        peticion = this.heroesService.crearHeroe(this.heroe);
      }
      peticion.subscribe((respuesta: any) => {
        setTimeout(
          () => {
            Swal.fire(
              this.heroe.nombre,
              'Registro guardado correctamente',
              'success'
            );
          }, 1500);
      });
    } else {
      return;
    }
  }

}
