import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('');

const SubscriptionForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [priceId, setPriceId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            const { data } = await axios.post('http://localhost:3000/payment/create-subscription', { customerId, priceId });
            const { clientSecret, status } = data;

            if (status === 'incomplete') {
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: { email },
                    },
                });

                if (result.error) {
                    setMessage(`Payment failed: ${result.error.message}`);
                } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                    setMessage('Subscription successful!');
                }
            } else {
                setMessage('Subscription created and active!');
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (


        <form onSubmit={handleSubscribe} className={'flex flex-col gap-0.5 w-full'}>
            <label className={'w-full flex gap-1 items-center'}>
                Email
                <input
                    type="email"
                    className={'border-solid border-[1px] rounded border-blue-500 p-1'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label className={'w-full flex gap-1 items-center'}>
                Name
                <input
                    type='text'
                    className={'border-solid border-[1px] rounded border-blue-500 p-1'}
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />
            </label>
            <label className={'w-full flex gap-1 items-center'}>
                PriceId
                <input
                    className={'border-solid border-[1px] rounded border-blue-500 p-1'}
                    type='text'
                    value={priceId}
                    onChange={(e) => setPriceId(e.target.value)}
                    required
                />
            </label>
            <label className={'w-full flex gap-1 items-center'}>
                Card Info
                <CardElement options={{ hidePostalCode: true }} className={'border-solid border-[1px] rounded border-blue-500 p-1 w-full'}/>
            </label>
            <button type="submit" disabled={!stripe || isLoading}>
                {isLoading ? 'Processing...' : 'Subscribe'}
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

const SubscriptionPage: React.FC = () => {
    return (
        <div className={'w-[50%] flex flex-col gap-5 font-bold'}>
            <h2 className={'text-blue-500'}>Subscription form</h2>
            <Elements stripe={stripePromise}>
                <SubscriptionForm/>
            </Elements>
        </div>
    );
};

export default SubscriptionPage;
