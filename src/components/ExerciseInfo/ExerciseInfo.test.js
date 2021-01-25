import ExerciseInfo from './ExerciseInfo';
import ReactDOM from 'react-dom';
describe("Basic Render Test", ()=>{
    it('renders ExerciseInfo Frame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExerciseInfo/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})