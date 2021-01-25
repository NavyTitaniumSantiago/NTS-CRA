import RoutineCustomization from './RoutineCustomization';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders SelectionFrame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RoutineCustomization/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})