import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './modules/teacher/components/home/home.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'signup',
        pathMatch:'full'
    },
    {
        path: 'signup',
        loadComponent: () => import('./modules/auth/signup/signup.component').then((x) => x.SignupComponent),
        title: 'SignUp',
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login.component').then((x) => x.LoginComponent),
        title: 'LogIn',
    },
    {
        path: 'adminHome',
        loadComponent: () => import('./modules/admin/components/home/home.component').then((x) => x.HomeComponent),
        title: 'DashBoard',
        data: {
            allowedRoles : 'Admin'
         },
        children : [
            {
                path: 'categoryList',
                loadComponent: () => import('./modules/admin/components/category/category-list/category-list.component').then((x) => x.CategoryListComponent),
                title: 'Category',
                data: {
                    allowedRoles : 'Admin'
                 },
                canActivate: [authGuard]
            },
            {
                path: 'subcategoryList',
                loadComponent: () => import('./modules/admin/components/subcategory/subcategory-list/subcategory-list.component').then((x) => x.SubcategoryListComponent),
                title: 'Sub Category',
                data: {
                    allowedRoles : 'Admin'
                 },
                canActivate: [authGuard]
            },
            {
                path: 'studentList',
                loadComponent: () => import('./modules/admin/components/student/student-list/student-list.component').then((x) => x.StudentListComponent),
                title: 'Student',
                data: {
                    allowedRoles : 'Admin'
                 },
                canActivate: [authGuard]
            },
            {
                path: 'teacherList',
                loadComponent: () => import('./modules/admin/components/teacher/teacher-list/teacher-list.component').then((x) => x.TeacherListComponent),
                title: 'Teacher',
                data: {
                    allowedRoles : 'Admin'
                 },
                canActivate: [authGuard]
            },
            {
                path: 'coursesList/:id',
                loadComponent: () => import('./modules/admin/components/teacher/courses-list/courses-list.component').then((x) => x.CoursesListComponent),
                title: 'Courses',
                data: {
                    allowedRoles : 'Admin'
                 },
                canActivate: [authGuard]
            },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'teacherHome',
        loadComponent: () => import('./modules/teacher/components/home/home.component').then((x) => x.HomeComponent),
        title: 'Teacher',
        data: {
            allowedRoles : 'Teacher'
         },
        children : [
            {
                path: '',
                loadComponent: () => import('./modules/teacher/components/courses-list/courses-list.component').then((x) => x.CoursesListComponent),
                title: 'All Courses',
                canActivate: [authGuard]
            },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'studentHome',
        loadComponent: () => import('./modules/student/components/student-home/student-home.component').then((x) => x.StudentHomeComponent),
        title: 'Student',
        data: {
            allowedRoles : 'Student'
         },
        children : [
            // {
            //     path: 'notActivate',
            //     loadComponent: () => import('./modules/teacher/components/notactivate/notactivate.component').then((x) => x.NotactivateComponent),
            //     title: 'NotActivate',
            //     canActivate: [authGuard]
            // },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'notActivate',
        loadComponent: () => import('./modules/teacher/components/notactivate/notactivate.component').then((x) => x.NotactivateComponent),
        title: 'NotActivate',
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./layouts/unauthorized/unauthorized.component').then((x) => x.UnauthorizedComponent),
        title: 'Unauthorized',
    },
];
