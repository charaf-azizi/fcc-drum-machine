import React from "react";
import { Component } from "react";
import './drum_machine.scss'
class Drum_machine extends Component{
constructor(props){
    super(props);
    this.state = {
        volume: 1,
        displayer:'',
        audioObj:{
            'Heater-1':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
'Heater-2':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
'Heater-3':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
'Heater-4':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
'Clap':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
'Open-HH':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
"Kick-n'-Hat":'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
'Kick':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
'Closed-HH':'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3',
        },
        keyArr:['Q','W','E','A','S','D','Z','X','C']
    };
    this.audioRefs= this.state.keyArr.reduce((refs,key)=>{
        refs[key] = React.createRef()
        return refs
    },{})
};
componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown);
};
handleDrag = (event)=>{
 this.setState({volume:event.target.value})
 console.log(this.state.volume)
}
handleClick = (x)=>{
    let objK = Object.keys(this.state.audioObj);
    this.setState({displayer:objK[x]})
    
            const audio = new Audio()
            audio.src = this.state.audioObj[objK[x]]; 
            audio.volume = this.state.volume
           audio.play();   
       
};

handleKeyDown = (event)=>{
    let objK = Object.keys(this.state.audioObj);
   for(let i=0; i< this.state.keyArr.length;i++){
    if(event.key.toLocaleLowerCase() == this.state.keyArr[i].toLocaleLowerCase() ){
        const audio = new Audio()
        audio.src = this.state.audioObj[objK[i]];
        this.setState({displayer:objK[i]})
        audio.volume = this.state.volume
        audio.play()
        this.audioRefs[this.state.keyArr[i]].current.classList.add('active');
    setTimeout(() => {
        this.audioRefs[this.state.keyArr[i]].current.classList.remove('active');
    }, 100); 
    };
   } 
    
} 
pad_keys =()=>{ 
    return (this.state.keyArr.map((x,index)=>{
    let objK = Object.keys(this.state.audioObj);
    return(
        <div className="drum-pad" onClick={()=>this.handleClick(index)} ref={this.audioRefs[this.state.keyArr[index]]} id={objK[index]} key={x}><label>{x}</label></div>
    )
}))}

render(){
    return(
        <div id="drum-machine">
            
            <div className="drum-pad">
        {this.pad_keys()}
            </div>
            <div className="leftSide">
        <label id="display"> {this.state.displayer}</label>
        <input onChange={this.handleDrag} step={0.1} type="range" min="0" max="1" value={this.state.volume}/>
            </div>
        </div>
    )
}
}
export default Drum_machine;