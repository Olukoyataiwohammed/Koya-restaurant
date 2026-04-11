
export const API_BASE_URL = 'http://localhost:8000/'; // replace with your Django backend URL



/**
 * Fetches all menu items from Django Api.
 * @returns {Promise<Array>} A promise that resolves to an array of menu items.
 * **/
export const fetchCategories = async (authToken = null) => {
    

    

    try {
        const response = await fetch(`${API_BASE_URL}menu/`);
        if (!response.ok){
            // handle non-200 responses
            throw new Error(`HTTP error! status: ${response.ok}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error fetching menu items:", error)
        // you can re-throw the error or return a default/empty state
        throw error;
    }

}

export const fetchMenuItems = async (authToken = null) => {
    

    

    try {
        const response = await fetch(`${API_BASE_URL}menu/menu-item/`);
        if (!response.ok){
            // handle non-200 responses
            throw new Error(`HTTP error! status: ${response.ok}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error fetching menu items:", error)
        // you can re-throw the error or return a default/empty state
        throw error;
    }

}


export const fetchDeals = async (authToken = null ) => {
   
    

    

    try {
        const response = await fetch(`${API_BASE_URL}deals/`,{
             method: 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${authToken}`,
            },

        });

       
        if (!response.ok){
            // handle non-200 responses
            throw new Error(`HTTP error! status: ${response.ok}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error fetching menu items:", error)
        // you can re-throw the error or return a default/empty state
        throw error;
    }

}





















// if needed you can add other functions here like fetchMenuItemById, etc..