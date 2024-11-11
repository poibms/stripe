import SubscriptionPage from "./SubscriptionForm.tsx";
import './App.css'
import CustomerPage from "./Customer/CustomerPage.tsx";

function App() {


  return (
      <>
          <div className={'w-[100%] flex gap-4'}>
              <CustomerPage/>
          <SubscriptionPage/>
          </div>
      </>
  )
}

export default App
