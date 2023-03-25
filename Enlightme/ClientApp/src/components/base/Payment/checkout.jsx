import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import PaymentForm from "./PaymentForm";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";

import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY = "pk_test_51M0QB5FabYI7Mnx1v98zYCf8PFtRSQc0rKZgWeMnKBQjJ615UQeTqt8u38FLYrdk0zBECM6nadoAj4RaatULhsxO00B1snZlSO";
const stripePromise = loadStripe(PUBLIC_KEY);

export default function Checkout() {
    const location = useLocation();
    const isAuth = useSelector(state => state.users.isAuth);
    const stripe = useStripe();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    const bookId = +location.pathname.slice(10);

    useEffect(() => {
        async function getIntents() {
            console.log(bookId);
            stripe.ap
            const data = await requestHelper.get(
                serviceUrls.payment, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "mode": 'no-cors'
                    },
                    body: JSON.stringify(bookId)
            }, isAuth);
        }

        getIntents();
    }, [bookId, setClientSecret]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance
    };

    return ( 
        <div>
            {
                clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm />
                    </Elements>
                )
            }
        </div>
    )
}