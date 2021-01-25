import Auth from './Auth';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders Auth Frame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Auth/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})