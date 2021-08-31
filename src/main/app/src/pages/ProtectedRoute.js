import {React} from 'react';
import {Route, Redirect} from 'react-router-dom';
const auth = localStorage.getItem('isAuth');
const ProtectedRoute = ({component: Component,...rest}) =>{
    return (
        <Route {...rest} render={(props)=>{
            if(auth) return <Component {...props}/>
            return <Redirect to={{ path:"/", state: {from:props.location}}}/>
        }}/>
    )
}

export default ProtectedRoute;
