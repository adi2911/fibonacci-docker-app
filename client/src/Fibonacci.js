import React, {Component} from 'react'
import axios from 'axios';

class Fibonacci extends Component{
    state={
        seenIndexes:[],
        values:{},
        index:''
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues()
    {
        const values=await axios.get('/api/values/current');
        this.setState({values:values.data})
    }
    async fetchIndexes(){
        const seenIndexes=await axios.get('/api/values/all')
        this.setState({seenIndexes:seenIndexes.data})
    }
    handleSubmit= async(event)=>{
        event.preventDefault();
        console.log("I was called")
        await axios.post('/api/values',{
            index:this.state.index
        })
        this.setState({index:''})
    }
    rendedSeenIndexes()
    {
        return this.state.seenIndexes.map(({number})=>number).join(',')
    }
    renderCalculatedValues()
    {
        const entries=[]
        for(let key in this.state.values)
        {
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                 </div>
            )
        }
        return entries;
    }
   

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Enter your index</label>
                    <input value={this.state.index} onChange={event=>this.setState({index:event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen: {this.rendedSeenIndexes()} </h3>
                <h3> Calculated Values: {this.renderCalculatedValues()}</h3>
            </div>
        )
    }
}



export default Fibonacci