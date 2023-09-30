import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { NavSideBarComponent } from './shared/pages/nav-side-bar/nav-side-bar.component';
import { HomePageComponent } from './products/pages/home-page/home-page.component';
import { ProductsModule } from './products/products.module';
import { SearchInputComponent } from './shared/components/search-input/search-input.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, NavSideBarComponent, SearchInputComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
