import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AboutComponent } from './about/about.component';
import {MainContentComponent} from './main-content/main-content.component';


const routes: Routes = [
  {path:'',component:MainComponent ,children:[
    {path:'', redirectTo:'home',pathMatch:'full' },
    {path:'home',component: MainContentComponent},
    {path:'about',component: AboutComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
