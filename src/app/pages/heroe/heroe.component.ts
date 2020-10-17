import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroeCreado = false;
  cargando = false;

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm): any {
    this.cargando = true;
    if (form.valid) {
      this.heroesService.crearHeroe(this.heroe).subscribe((respuesta: any) => {
        setTimeout(() => {
          this.heroeCreado = true;
        }, 1500);
      });
    } else {
      return;
    }
  }

}
