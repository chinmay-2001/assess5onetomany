import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { FormsModule } from '@angular/forms'



@NgModule({
  declarations: [
    AppComponent,
    BookCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
