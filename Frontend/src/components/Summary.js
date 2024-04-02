import PieChartComponent from './Piechart';
import './Summary.css';

export default function Summary(){
    return (
        <div className="summary_main">
            <div className="left">
                <div className="summaryText">
                    <p>What Js Framework do you use daily Js Framework do you use daily </p>
                </div>
                <div className="breakdownCont">
                    <div className="breakdownKey">
                        <p>Cash</p>
                        <span>20%</span>
                    </div>
                </div>
            </div>
            <div className="right">
                <PieChartComponent/>
            </div>
        </div>
    )
}