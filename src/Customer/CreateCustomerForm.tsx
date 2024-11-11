import React, {FormEvent, useState} from 'react';
import axios from "axios";
import {Customer} from "../types/customer.types.ts";

interface ICreateCustomerFormProps {
    handleAddNewCustomer: (payload: Customer) => void;
}

const CreateCustomerForm: React.FC<ICreateCustomerFormProps> = ({handleAddNewCustomer}) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3000/payment/create-customer', { email, name });
        handleAddNewCustomer(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-2'}>
                <label className={'w-full flex gap-1 items-center'}>
                    Email
                    <input
                        type="email"
                        className={'border-solid border-[1px] rounded border-blue-500 p-1'}
                        placeholder={'email@gmail.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className={'w-full flex gap-1 items-center'}>
                    <span className={''}>Name</span>
                    <input
                        type="text"
                        placeholder={'Ivan'}
                        className={'border-solid border-[1px] rounded border-blue-500 p-1'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className={'bg-blue-500 text-white w-[150px]'}>
                    Add customer
                </button>
            </form>
        </div>
    );
};

export default CreateCustomerForm;