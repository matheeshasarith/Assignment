import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/animal/detail',
    component: lazy(() => import('../../views/pages/AnimalDetail')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
  
]

export default PagesRoutes
