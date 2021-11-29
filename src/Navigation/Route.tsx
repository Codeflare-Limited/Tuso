import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Switch, RouteComponentProps, Router} from 'react-router-dom'
import HomePage from '../components/Home/HomePage';
import NotePage from '../components/Note/NoteWrapper'; 
import SketchPage from '../components/Sketch/components/sketch'

import SketchApp from '../app';


const Navigation: FC = () => {
    useEffect(() => {  

    }, [])
         
          
    return (
       <div>
         <BrowserRouter>
         <Switch>
           <Route exact path="/" component={HomePage} />
           <Route exact path="/note" component={NotePage} />
           <Route exact path="/sketch" component={SketchApp} />
           
           {/* {routes.map((route, index) => {         
             return ( 
                  <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props: RouteComponentProps<any>) => (
                        <route.component
                            name={route.name} 
                            {...props}
                            {...route.props}
                    />
                  )}
                />
            )
           })} */}
         </Switch>
         </BrowserRouter>
       </div>
    )
}



      

export default Navigation;    