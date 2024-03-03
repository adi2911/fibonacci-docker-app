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
    handleSubmit= async(event)=>{
        event.preventDefault();
        await axios.post('/api/values',{
            index:this.state.index
        })
        this.setState({index:''})
    }

    render(){
        return(
            <div>
                <form>
                    <label> Enter your index</label>
                    <input value={this.state.index} onChange={event=>this.setState({index:event.target.value})}/>
                    <button onSubmit={this.handleSubmit}>Submit</button>
                </form>
                <h3>Indexes I have seen: {rendedSeenIndexes} </h3>
                <h3> Calculated Values: {renderCalculatedValues}</h3>
            </div>
        )
    }
}



export default Fibonacci