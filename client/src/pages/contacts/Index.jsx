// import React from 'react'

function Contacts() {
  return (
    
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <div className="max-w-lg mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contacts
