import Navbar from './Navbar';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
describe("Basic Render Test", ()=>{
    it('renders Navbar without crashing', () => {
        const div = document.createElement('div');       
        ReactDOM.render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})