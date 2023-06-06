import { client } from "../axios"

export const getSignIn = (email, password) => client({
    method: "POST",
    url: "/login",
    data: { email, password }
});

export const getSignUp = (name, email, password) => client({
    method: "POST",
    url: "/register",
    data: { name, email, password }
});