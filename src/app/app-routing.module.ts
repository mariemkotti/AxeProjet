import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FusionComponent } from './screen/screen-content/fusion/fusion.component';
import { ScreenContentComponent } from './screen/screen-content/comparaison/comparaison.component';
// import { XmlComponent } from './screen/screen-content/comparaison/xml.service-content';


export const routes: Routes = [
  { path: 'Fusion', component: FusionComponent },
  { path: 'Comparaison', component: ScreenContentComponent },
  //  { path: 'Home', component:XmlComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
