import CreateCustomerForm from "./CreateCustomerForm.tsx";
import {useEffect, useState} from "react";
import {Customer} from "../types/customer.types.ts";
import CustomersList from "./CustomersList.tsx";
import axios from "axios";

const CustomerPage = () => {
    const [customers, setCustomers] = useState<Array<Customer>>([])


    const handleAddCustomer = (payload: Customer): void => {
        setCustomers(prevState => prevState.concat(payload));
    }

    useEffect(() => {
        axios.get('http://localhost:3000/user/').then(({data}) => {
            setCustomers(data)
        })
    }, [])

    return (
        <div className={'w-[50%] flex flex-col gap-5 font-bold'}>
            <h2 className={'text-blue-500'}>Customer Page</h2>

            <CreateCustomerForm handleAddNewCustomer={handleAddCustomer}/>

            <CustomersList customers={customers}/>
        </div>
    );
};

export default CustomerPage;