import IRoute from "../interface/IRoute";
import HomePage from '../components/Home/HomePage'
import SketchPage from '../components/Sketch/components/sketch'
import NotePage from '../components/Note/Note'




const routes:IRoute[] = [
    {
        name: 'HomePage',
        path: '/', 
        component: HomePage, 
        exact: true
    }, 

    {
        name: 'Sketch',
        path: '/sketch', 
        component: SketchPage, 
        exact: true 
    }, 

    {
        name: 'note',
        path: '/note', 
        component: NotePage, 
        exact: true 
    }
]


export default routes