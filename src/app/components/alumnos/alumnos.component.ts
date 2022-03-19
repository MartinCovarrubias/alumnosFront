import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
       //acceder arreglo [0] para ver datos
        this.alumnos=data;
        console.log(this.alumnos);

      }

    )

}

}