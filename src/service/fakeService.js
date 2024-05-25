const ip = "10.0.0.113"
const server = 'http://' + ip;
const port = 3000;
export const signIn = async (obj) => {
    try {
        const url = `${server}:${port}/users/signin`;
       
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to sign in user: " + error);
    }
};
 
export const signUp = async (obj) => {
    try {
        const url = `${server}:${port}/users/signup`;
        
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to sign up user: " + error);
    }
};
 
export const updateSignin = async (obj) => {
    try {
        const url = `${server}:${port}/users/update`;
      
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.tok}`
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to sign up user: " + error);
    }
};
 
export const fetchCartDetails = async (obj) => {
    try {
        const url = `${server}:${port}/cart`;
       
        const res = await fetch(url, {
            method: "GET", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.tok}`
            },
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to fetch user cart: " + error);
    }
};
 
export const saveCart = async (obj) => {
    try {
        const url = `${server}:${port}/cart`;
        
        const res = await fetch(url, {
            method: "PUT", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.items[0].token}`
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to update/add user cart: " + error);
    }
};
 
export const getOrder = async (obj) => {
    try {
        const url = `${server}:${port}/orders/all`;
      
        const res = await fetch(url, {
            method: "GET", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.tok}`
            },
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to fetch user cart: " + error);
    }
};
 
export const saveOrder = async (obj) => {
    try {
        const url = `${server}:${port}/orders/neworder`;

        const res = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.items[0].token}`
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to update/add user order: " + error);
    }
};
 
export const updateOrder = async (obj) => {
    try {
        const url = `${server}:${port}/orders/updateorder`;

   
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obj.token}`
            },
            body: JSON.stringify(obj),
        });
        return await res.json();
    } catch (error) {
        throw new Error("Failed to update/add user order: " + error);
    }
};