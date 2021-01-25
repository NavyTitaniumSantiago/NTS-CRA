import CustomEntry from './CustomEntry';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders CustomEntry Frame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomEntry/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})