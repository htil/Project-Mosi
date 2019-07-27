import React from 'react';
import ReactDOM from 'react-dom';
import Commands from './commands';
import EEG from './eeg';

class App extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {headset: null, controller: null}
    }

    componentDidMount = () => {
        this.setState({ headset: false, controller: false})
    }

    setController = () => {
        this.setState({ headset: false, controller: true})
    }

    setEEG = () => {
        this.setState({ headset: true, controller: false})
    }

    homeScreen = () => {
        this.setState({headset: false, controller: false})
    }

    renderContent() {
        if(!this.state.headset && !this.state.controller){
            return (
                <div style= {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                }}>
                    <button className="massive ui negative icon button" onClick= {this.setController}>
                        <i className="gamepad icon"></i>
                    </button>
                    <button className="massive positive ui icon button" onClick= {this.setEEG}>
                        <i className="headphones icon"></i>
                    </button>
                 </div>
            )
        }

        if(!this.state.headset && this.state.controller){
            return (
                <div>
                    <Commands />
                    <div className= "ui two bottom attached buttons">
                        <button className="positive ui button" onClick= {this.homeScreen}>
                            <i className="large home icon"></i>
                        </button>
                    </div>  
                </div>
                
            )
        }

        if(this.state.headset && !this.state.controller){
            return (
                <div>
                   <EEG /> 
                   <div className= "ui two bottom attached buttons">
                        <button className="positive ui button" onClick= {this.homeScreen}>
                            <i className="large home icon"></i>
                        </button>
                    </div>  
                </div>
                
            )
        }
    }
        
    render() {
        
           return (
            <div className= "border white">
                {this.renderContent()}
            </div>
            ) 

        
    }
}

ReactDOM.render (
    <App />,
    document.querySelector('#root')
)