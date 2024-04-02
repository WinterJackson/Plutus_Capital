import './AuthScreen.css'
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();

    return(
        <div className="authscreenMain">
            <div className="mainContent">
                <div className="authLeft">
                    <div className="companyName">
                        <div className="nameTop">PLUTUS</div>
                        <div className="nameBottom">CAPITAL</div>
                    </div>
                </div>
                <div className="authRight">
                    <div className="companySummary">
                        <p>
                        Take a survey on a collection of customized financial research questions
                        aimed at providing insightful information to help you gain a clear and complete picture of the areas under coverage in investment.
                        </p>
                    </div><br/>
                    <div className="btnsCont">
                        <button className="getStarted" onClick={() => navigate('/questions')}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}