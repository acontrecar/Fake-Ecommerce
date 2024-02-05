import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Fake-Ecommerce';

  ngOnInit() {
    console.log(
      '%cHola, gracias por visitar esta página!\n\nSi quieres continuar investigando no dudes en hacerlo en:\n\nwww.linkedin.com/in/antoniocontrerascárdenas',
      'font-weight: bold; font-style: italic; font-size: 1.2rem'
    );
  }
}
