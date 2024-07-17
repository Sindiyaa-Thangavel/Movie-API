import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'Movie Details', component: DetailsComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Favorite', component: FavoriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
