import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DirectorsService } from '../directors.service';
import { Director } from '../director';

@Component({
  selector: 'app-director-form',
  templateUrl: './director-form.component.html',
  styleUrls: ['./director-form.component.css']
})
export class DirectorFormComponent implements OnInit {

  director: Director;
  id : number;
  path = this.route.snapshot.url[0].path;
  title: string = 'Add director';

  /*directorForm = new FormGroup({
    Name: new FormControl(''),
    Lastname: new FormControl(''),
    Age: new FormControl('')
  });*/

  directorForm = this.formBuilder.group({
    Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    Lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    Age: ['', [Validators.required, Validators.min(15), Validators.max(100)]]
  });

  constructor(
    private route: ActivatedRoute,
    private directorService: DirectorsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("path " + this.path);
    if (this.path ==='edit-director') {
      this.id = +this.route.snapshot.paramMap.get('id'); //Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
      this.getDirector();
      this.title = 'Edit director';
    }
  }

  get name() { return this.directorForm.get('Name'); }
  get lastname() { return this.directorForm.get('Lastname'); }
  get age() { return this.directorForm.get('Age'); }

  onSubmit() {
    this.director = this.directorForm.value;
    if (this.path === 'edit-director') {
      this.director.Id = this.id;
      this.directorService.updateDirector(this.id, this.director).subscribe(d => console.log('Value: ' + d.Id), err => console.error('Observer got an error: ' + err), () => this.directorService.goBack());
    }
    else {
      this.directorService.addDirector(this.directorForm.value as Director).subscribe(d => console.log('Value: ' + d.Id), err => console.error('Observer got an error: ' + err), () => this.directorService.goBack());
      this.director = null;
    }
    console.log(this.director);
  }

  getDirector() : void {
    //const id = +this.route.snapshot.paramMap.get('id'); //Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    console.log('Id: ' + this.id);
    this.directorService.getDirector(this.id)
      .subscribe(d => {this.director = d; 
        this.directorForm.controls['Name'].setValue(d.Name); 
        this.directorForm.controls['Lastname'].setValue(d.Lastname);
        this.directorForm.controls['Age'].setValue(d.Age)
    });
  }
}
