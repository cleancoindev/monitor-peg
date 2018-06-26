import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

//export const AppRouter: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRouter {}
