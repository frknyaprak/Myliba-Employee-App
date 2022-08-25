import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
	HttpClientModule,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: HttpLoaderFactory,
			deps: [HttpClient]
		}
	}),
    NotifierModule.withConfig({
			position: {
				horizontal: {
					position: "middle",
					distance: 12
				},
				vertical: {
					position: "top",
					distance: 12,
					gap: 10
				}
			},
			theme: "material",
			behaviour: {
				autoHide: 1000,
				onClick: "hide",
				onMouseover: "pauseAutoHide",
				showDismissButton: false,
				stacking: 4
			},
			animations: {
				enabled: true,
				show: {
					preset: "slide",
					speed: 300,
					easing: "ease"
				},
				hide: {
					preset: "fade",
					speed: 300,
					easing: "ease",
					offset: 50
				},
				shift: {
					speed: 300,
					easing: "ease"
				},
				overlap: 150
			}
		})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
