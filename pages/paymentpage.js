import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

function OrderScreen() {

    const onApprove = () => {return}
    const onError = () => {return}
    let loadingPay = false
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const orderId = 123


  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal');
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    loadPaypalScript();


  }, []); 


  

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: 20 },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }



   

  return (
    <>
      <h1 className="mb-4 text-xl"></h1>
        <div className="grid md:grid-cols-4 md:gap-5">
          <div><div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>


                  <li>

                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>

                  </li>



              </ul>
            </div>

            </div>



          </div>
        </div>
   </>
  );
}

export default OrderScreen
