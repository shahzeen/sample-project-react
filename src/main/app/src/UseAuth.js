import {
    useState
} from 'react';
import {
    useHistory
} from 'react-router-dom';
export default function useAuth(intialValue) {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    function login(user, pass) {
        setIsLoading(true);
        var promise = new Promise(function (resolve, reject) {
            setTimeout(() => {
                if (user === 'foo' && pass === 'bar') {
                    setIsLoading(false);
                    localStorage.setItem('isAuth', true);
                    history.push('/home');
                    resolve('success');
                } else {
                    setIsLoading(false);
                    localStorage.setItem('isAuth', false);
                    resolve('error');
                }
            }, 2000);
        });
        return promise;

    }

    function logout() {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('isAuth', false);
            setIsLoading(false);
            // localStorage.clear();
            history.push('/');

        }, 2000);
    }



    return [login, logout, isLoading];
}