import RoutineCustomization from './RoutineCustomization';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders RoutineCustomizationFrame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RoutineCustomization/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})