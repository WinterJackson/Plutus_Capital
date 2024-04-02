import { useState } from "react"
import LoginForm from "./SignInForm"
import SignUpForm from "./SignupForm"
import './AuthScreen.css'

export default function AuthScreen(){
    const [currentForm, setCurrentForm] = useState('login')
    const [modalVisibility, setModalVisibility] = useState(false)

    const handleModal = ()=>{
        setModalVisibility(!modalVisibility)
    }
    return(
        <div className="authscreenMain">
            <div class={modalVisibility ? "overlay" : 'modalFalse'}></div>
            <div class={modalVisibility ? "LoginsModal" : 'modalFalse'}>
                <div className={modalVisibility ? "closeBtn" : 'modalFalse'} onClick={handleModal}>
                    X
                </div>
                {currentForm === 'login' ? <LoginForm setCurrentForm={setCurrentForm} modalVisibility={modalVisibility}/> : <SignUpForm setCurrentForm={setCurrentForm} modalVisibility={modalVisibility}/>}
            </div>
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
                    </div>
                    <div className="btnsCont">
                        <button className="getStarted" onClick={handleModal}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}