import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { fetchDeals } from './MenuApi';



const Deals = () => {
  const { authToken, isAuthenticated } = useAuth();
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{


    const getDeals = async ()=>{
      if (!authToken){
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
            
      try{
        const deals_ = await fetchDeals(authToken);
        setDeals(deals_);
              
        console.log("showing menu Items:");
              
              
      }
      catch (err) {
        setError("Failed to load menu items for");
      }
      finally{
              setIsLoading(false);
     }
    };
      
      getDeals();
    
  },[authToken]);

  if (isLoading) return <div>Loading....</div>;
   if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{isAuthenticated ? 'Exclusive menu' : 'public'}</h1>
      {deals.length > 0 ? (
        <ul>
          {deals.map(deal =>(
            <li key={deal.id}>{deal.tittle}: {deal.description}</li>
          ))}
        </ul>
      ) : (
        <p>No deals found or you are not logged in ....</p>
      )}
    </div>
  )
}

export default Deals;