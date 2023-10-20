import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,

  ) {}

  public color: string = 'red';
  public text: string = 'loquesea'

  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(5), Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    username: ['', [ Validators.required, Validators.minLength(10) ]],
    email: ['',[ Validators.required, Validators.minLength(6), Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    password2: ['', [ Validators.required, Validators.minLength(8) ]],
  }, {
    validators: [
      this.validatorsService.isFiledOneEqualFieldTwo('password','password2'),
      this.validatorsService.isCompleteName('name')
    ]
  });

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}
