import SignLayout from "../layouts/SignLayout";

export const publicRoutes = [
  { path: '/login/:type?', component: SignLayout},
  // { path: '/login/:type?', component: Sign, exact: true },
];