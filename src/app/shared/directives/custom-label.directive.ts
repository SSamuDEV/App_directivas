import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})

export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color = 'black'
  private _errors?: ValidationErrors | null;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log(value);
    this.setErrorMessage();
  }

  //@Input()
  set changeContent(value: string) {
    if ( !this.htmlElement ) return;

    this.htmlElement.nativeElement.textContent = value;
  }


  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle() {
    if ( !this.htmlElement ) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.textContent = 'Formato Correcto';
      this.htmlElement.nativeElement.style.color = 'Green';
      return;
    }

    this.htmlElement.nativeElement.style.color = 'Red';
    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const currentValue = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `La longitud mínima debe ser de ${ min } caracteres, llevas ${ currentValue }`;
      return;
    }

    if (errors.includes('pattern')) {
      this.htmlElement.nativeElement.innerText = 'El formato debe ser de un email, debe incluir @ y .';
      return;
    }

    if (errors.includes('namePattern')) {
      this.htmlElement.nativeElement.innerText = 'El formato debe contener solo letras y separando por nombre y apellidos';
      return;
    }

    if (errors.includes('notEquals')) {
      this.htmlElement.nativeElement.innerText = 'Las contraseñas no son iguales';
      return;
    }

  }
}
