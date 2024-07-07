import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentCheckout = (props) => {

    const styles = {
  
        reviewBox: {
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          padding: '5px',
          marginTop: '50px',
          marginBottom: '0px',
          display: 'flex',
          alignItems: 'center',
          width: '72%',
          /*height: '25%',*/
    
        },
        popup:{
          position:"fixed",
          top:'0px',
          left:'0px',
          width:'100%',
          height:'100vh',
          backgroundColor:'rgba(0,0,0,0.2)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        },
    
        popupinner:{
          position:'relative',
          padding:'32px',
          width:'100%',
          maxWidth:'640px',
          backgroundColor:'#fff',
          overflow:'scroll',
          height:'60vh',
        },
        closebtn:{
          position:'sticky',
          float:'right',
          top:'0px',
          right:'16px',
          padding:'5px 10px',
        },
        circle: {
          backgroundColor: '#ccc',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          marginRight: '10px',
          marginBottom: '50px',
          
        },
        reviewContent: {
          flex: '1',
          margin:'30px',
        },
        ratingStars: {
          color: 'gold',
        },
        messageLink: {
          color: 'black',
          cursor: 'pointer',
          marginLeft:'0px',
        },
        heading: {
          paddingTop: '50px'
        }
      };
    
  return (props.trigger)?(
    <div style={styles.popup}>
        <div style={styles.popupinner}>
        <button style={styles.closebtn} onClick={()=>props.setTrigger(false)}>Close</button>
      <h1>Event Ticket Payment</h1>
      <p>Ticket Price : LKR. {props.price.toString()}</p>
      <PayPalScriptProvider options={{ "client-id": "AbePtiDNqzuFs66DYkA2EXTKWhEgLbeRjSA4MUrkTjpA1b0Kf3NlrXgvZm9uyDGyYWMNoRf-SA4FPcPM" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: props.price.toString(), 
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              props.setSuccess(true);
              props.setTrigger(false)
              alert("Transaction completed by " + details.payer.name.given_name);
                
              
            });
          }}
        />
      </PayPalScriptProvider>
      </div>
    </div>
  ):(
    <p>error</p>
  )
};

export default PaymentCheckout;
