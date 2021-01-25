import ExerciseList from './ExerciseList';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders ExerciseList Frame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExerciseList/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})