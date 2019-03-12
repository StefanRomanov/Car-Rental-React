import React, {Component, Fragment} from 'react';
import {carService} from '../../../services'
import Loading from "../../common/Loading";
import CarInformation from "./CarInformation";
import {Link} from "react-router-dom";
import {UserConsumer} from "../../contexts/UserContext";


class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            id: '',
            brand: '',
            model: '',
            count: '',
            trunkCapacity: '',
            doors: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        carService.getCarById(id)
            .then(data => {
                this.setState({
                    isLoaded: true,
                    ...data
                });
            })
            .catch(e => {
                console.log(e);
            })
    }


    render() {
        if (!this.state.isLoaded) {
            return <Loading/>
        }

        const {user} = this.props;

        return (
            <Fragment>
                <CarInformation data={this.state}/>
                {
                    user.role === 'ADMIN' ? (
                        <Fragment>
                            <hr/>
                            <div className="row justify-content-center my-3">
                                <Link className="btn btn-info mx-3 text-white w-25" to={"/cars/edit/" + this.state.id}>Edit</Link>
                                <Link className="btn btn-danger mx-3 text-white w-25"
                                      to={"/cars/delete/" + this.state.id}>Delete</Link>
                            </div>
                        </Fragment>
                    ) : ''
                }
            </Fragment>
        )
    }

}


const CarDetailsWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({user}) => (
                    <CarDetails {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default CarDetailsWithContext;