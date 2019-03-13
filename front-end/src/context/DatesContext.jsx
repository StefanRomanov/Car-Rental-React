import {createContext} from 'react'

const defaultDateState = {
    startDate: '',
    endDate: ''
};

const {Consumer: DatesConsumer, Provider : DatesProvider} = createContext(defaultDateState);

export  {
    DatesConsumer,
    DatesProvider,
    defaultDateState
}