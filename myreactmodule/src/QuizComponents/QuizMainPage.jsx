import { Link } from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

function QuizMainPage() {
    const navigate = useNavigate();
    return (<div>
        <Link design="Default"
            onClick={function fn() {
                navigate("/managequestion");
            }}
            wrappingType="None"
        >
            Manage My Questions
        </Link>
        <Link design="Default"
            onClick={function fn() {
                navigate("/quiz");
            }}
            wrappingType="None"
        >
            Take Quiz
        </Link>

    </div>);
}
export default QuizMainPage;