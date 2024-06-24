import React, {useState} from "react"

const Contact = () => {
    const [showNotification, setShowNotification] = useState(true)

    const handleClose = () => {
        setShowNotification(showNotification)
    }
    
    return (
        <>
        <div className="flex">
          <div className="w-full bg-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Manage Accounts</h1>
              <button className="bg-primary text-white py-2 px-4 rounded-lg">+ Add Account</button>
            </div>
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center">
              <img src="/whatsapp-logo.png" alt="WhatsApp Logo" className="h-12 w-12 mr-4" />
              <div>
                <p className="font-semibold">Link your WhatsApp account</p>
                <p className="text-sm text-gray-600">Please update/verify your information before 13th July 2023 to unlock level benefits</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="bg-gray-200 py-2 px-4 rounded-lg text-center">
                <p className="text-xl font-semibold">Account Usage</p>
                <p className="text-3xl font-bold">0/1</p>
                <button className="mt-2 bg-primary text-white py-2 px-4 rounded-lg">Upgrade</button>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <img src="/no-accounts-icon.png" alt="No accounts added" className="h-24 w-24 mb-4" />
              <p className="text-gray-600">No accounts added</p>
              <p className="text-gray-500">Click "add account" button to get started in linking your first whatsapp account</p>
            </div>
          </div>
        </div>
        </>
    )
}

export default Contact;