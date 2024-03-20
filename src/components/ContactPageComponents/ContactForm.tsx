import React from "react";

export default function ContactForm() {
    return (
        <div className="bg-sky-50/[0.75] w-3/5 my-16 lg:py-16 px-10 rounded-lg mx-auto max-w-screen-md">
            <form action="#" className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 text-base font-medium text-black">Your email</label>
                    <input type="email" id="email" className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="johndoe@gmail.com" required/>
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-base font-medium text-black">Subject</label>
                    <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required/>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-base font-medium text-black">Your message</label>
                    <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" className="bg-yellow-950 hover:bg-yellow-900 text-white py-3 px-5 text-sm font-medium text-center rounded-lg sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
            </form>
        </div>
    )
}