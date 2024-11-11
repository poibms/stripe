import React from 'react';
import {Customer} from "../types/customer.types.ts";

interface ICustomersListProps {
    customers: Array<Customer>;
}

const CustomersList: React.FC<ICustomersListProps> = ({customers}) => {
    return (
        <div className={'flex flex-col gap-2'}>
            {customers.map((customer) => (
                <div key={customer.id} className={'border-solid border-blue-500 border-[1px] rounded flex align-center justify-between p-1'}>
                    <p>{customer.email}</p>
                    <p>{customer.stripeCustomerId}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomersList;