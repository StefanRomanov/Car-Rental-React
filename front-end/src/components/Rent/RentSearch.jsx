import React, {Component} from 'react';
import Input from '../Generic/Input';
import fetcher from "../../data/fetcher";
import config from "../../config/server-config";
import Car from "../Car/Car";

class RentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                startDate: null,
                endDate: null
            },
            data: null,
            submitted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const form = {...this.state.form};
        form[e.target.name]= e.target.value;

        this.setState({
            form
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetcher.post(config.SERVER_PATH + "/cars/available", this.state.form)
            .then(data => {
                this.setState({
                    data: data.entity,
                    submitted: true
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }


    render() {
        return (
            <div className="rent-search">
                <form onSubmit={this.onSubmit}>
                    <h1>Find available cars</h1>
                    <Input
                        onChange={this.onChange}
                        type="date" name="startDate"
                        label="Start date"
                        required={true}
                        placeholder="Enter start date"
                        onfocus={() => {this.type='date'}}
                        onblur={() => {this.type='text'}}
                    />
                    <Input
                        onChange={this.onChange}
                        type="date" name="endDate"
                        label="Date of return"
                        required={true}
                        placeholder="Enter return date"
                        onfocus={() => {this.type='date'}}
                        onblur={() => {this.type='text'}}
                    />
                    <button type="submit">Find available cars</button>
                </form>
                {
                    this.state.submitted
                        ?   <div>
                                {
                                    this.state.data && this.state.data.length
                                        ? this.state.data.map(c => <Car key={c.id} brand={c.brand} model={c.model} pricePerDay={c.pricePerDay} id={c.id}/>)
                                        : <h1>No cars so found :(</h1>
                                }
                            </div>
                        :   <div>
                                <h1>Find available cars !</h1>
                            </div>
                }
            </div>
        )
    }

}

export default RentSearch;