import LiveRoutine from './LiveRoutine';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders LiveRoutine Frame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LiveRoutine/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})