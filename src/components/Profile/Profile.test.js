import Profile from './Profile';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders SelectionFrame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Profile/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})