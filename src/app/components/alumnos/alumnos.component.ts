import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  url = 'http://localhost:8080/api/alumnos/datoAlumno';
  
  header = new HttpHeaders().set('Content-Type', 'application/json');

  alumnos : any;
  formNocontrol: FormGroup = new FormGroup({});

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.formNocontrol=new FormGroup(
      {
      noControl: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]{8}"),
        Validators.minLength(8),
        Validators.maxLength(8)
        
      ])
     }
    )
  }


enviarNoControl(){
  //traer datos de un usuario
  this.http.get(this.url+'/'+this.formNocontrol.value.noControl,{headers:this.header}).subscribe(
    (data)=>{
      this.alumnos=data;
    },
    (error)=>{
      const err = error
      this.errorBusqueda(err);
      this.alumnos=null;
    }
    )
}

errorBusqueda(error:any){
  Swal.fire({
    icon: 'error',
    title: 'No se encontro el numero de control: ' + this.formNocontrol.value.noControl,
  })
}




}